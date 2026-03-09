import { useEffect, useRef, useState } from "react";
import {
  type Graph,
  type Hierarchy,
  OBOGraphLoader,
  type OBOGraphNode,
} from 'frogpot';

const ZP_ROOT = "http://purl.obolibrary.org/obo/ZP_0000000";
const ZFA_ROOT = "http://purl.obolibrary.org/obo/ZFA_0100000";
const UPHENO_ASSOCIATED_WITH = "http://purl.obolibrary.org/obo/UPHENO_0000003";

export type ZPData = {
  zpHierarchy: Hierarchy<OBOGraphNode>;
  zfaHierarchy: Hierarchy<OBOGraphNode>;
  zfaGraph: Graph<OBOGraphNode>;
  zpByZFA: Map<string, OBOGraphNode[]>;
  /** Get phenotypes for an anatomy term AND all its descendants */
  getPhenotypesForAnatomyWithDescendants: (anatomyUri: string) => OBOGraphNode[];
};

type GraphsLoading = {
  loading: true;
};

type GraphsLoaded = {
  loading: false;
} & ZPData;

export type GraphsResult = GraphsLoading | GraphsLoaded;

const zpCache: {
  promise: Promise<ZPData> | null;
  data: ZPData | null;
} = {
  promise: null,
  data: null,
};

/**
 * Compute ZFIN usage count from node metadata.
 * This extracts the reference count from nested basicPropertyValues.
 */
function computeZfinUsage(node: OBOGraphNode): number {
  const bpvs = node.meta?.basicPropertyValues || [];

  const zfinUsageBPV = bpvs.find(
    (bpv) =>
      bpv.pred === "http://purl.obolibrary.org/obo/terms_isReferencedBy" &&
      bpv.val === "http://purl.obolibrary.org/obo/infores_zfin"
  );

  if (!zfinUsageBPV) return 0;

  const usageMetaBPV = zfinUsageBPV.meta?.basicPropertyValues || [];

  const zfinUsageNumber = usageMetaBPV.find(
    (bpv) =>
      bpv.pred ===
      "http://www.geneontology.org/formats/oboInOwl#zapp:hasReferenceCount"
  );

  if (!zfinUsageNumber) return 0;

  return parseInt(zfinUsageNumber.val);
}

async function loadZPData(): Promise<ZPData> {
  const loader = new OBOGraphLoader();

  const [zfaGraph, zpGraph] = await Promise.all([
    loader.fromURI("/data/zfa.json"),
    loader.fromURI("/data/zp-zapp.json"),
  ]);

  const zfaHierarchy = zfaGraph.getHierarchy(ZFA_ROOT);
  const zpHierarchy = zpGraph.getHierarchy(ZP_ROOT);
  const zpItems = zpGraph.findAllChildren(zpGraph.getItem(ZP_ROOT));

  const zpByZFA = new Map<string, OBOGraphNode[]>();

  for (const node of zpItems) {
    // Pre-compute and cache ZFIN usage on each node for performance
    (node as OBOGraphNode & { zfinUsage: number }).zfinUsage = computeZfinUsage(node);

    for (const edge of node.edges || []) {
      if (edge.pred === UPHENO_ASSOCIATED_WITH) {
        if (!zpByZFA.has(edge.obj)) zpByZFA.set(edge.obj, []);
        zpByZFA.get(edge.obj)!.push(node);
      }
    }
  }

  // Pre-sort each anatomy's phenotype list by ZFIN usage (descending)
  for (const nodes of zpByZFA.values()) {
    nodes.sort((a, b) =>
      ((b as OBOGraphNode & { zfinUsage: number }).zfinUsage || 0) -
      ((a as OBOGraphNode & { zfinUsage: number }).zfinUsage || 0)
    );
  }

  // Cache for hierarchical lookups to avoid repeated traversals
  const descendantPhenotypeCache = new Map<string, OBOGraphNode[]>();

  /**
   * Get phenotypes for an anatomy term AND all its descendants.
   * Results are deduplicated and sorted by ZFIN usage.
   */
  function getPhenotypesForAnatomyWithDescendants(anatomyUri: string): OBOGraphNode[] {
    // Check cache first
    if (descendantPhenotypeCache.has(anatomyUri)) {
      return descendantPhenotypeCache.get(anatomyUri)!;
    }

    // Get the anatomy node and all its descendants
    const anatomyNode = zfaGraph.getItem(anatomyUri);
    if (!anatomyNode) {
      return [];
    }

    const descendants = zfaGraph.findAllChildren(anatomyNode);
    const allAnatomyUris = [anatomyUri, ...descendants.map(d => d.uri)];

    // Collect phenotypes from all anatomy terms, using a Set to deduplicate
    const phenotypeSet = new Map<string, OBOGraphNode>();
    for (const uri of allAnatomyUris) {
      const phenotypes = zpByZFA.get(uri);
      if (phenotypes) {
        for (const p of phenotypes) {
          phenotypeSet.set(p.uri, p);
        }
      }
    }

    // Convert to array and sort by ZFIN usage
    const result = Array.from(phenotypeSet.values()).sort((a, b) =>
      ((b as OBOGraphNode & { zfinUsage: number }).zfinUsage || 0) -
      ((a as OBOGraphNode & { zfinUsage: number }).zfinUsage || 0)
    );

    // Cache the result
    descendantPhenotypeCache.set(anatomyUri, result);

    return result;
  }

  return { zfaHierarchy, zpHierarchy, zfaGraph, zpByZFA, getPhenotypesForAnatomyWithDescendants };
}

export function useZPGraph(): GraphsResult {
  const [data, setData] = useState(zpCache.data);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    if (zpCache.data) {
      setData(zpCache.data);
      return;
    }

    if (zpCache.promise) {
      zpCache.promise.then((data) => {
        if (!cancelledRef.current) setData(data);
      });

      return;
    }

    zpCache.promise = loadZPData().then((data) => {
      zpCache.data = data;

      if (!cancelledRef.current) setData(data);

      return data;
    });

    return () => {
      cancelledRef.current = true;
    };
  }, []);

  if (!data) {
    return {
      loading: true,
    };
  }

  return {
    loading: false,
    ...data,
  };
}
