import { useEffect, useRef, useState } from "react";
import {
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
  zpByZFA: Map<string, OBOGraphNode[]>;
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

  return { zfaHierarchy, zpHierarchy, zpByZFA };
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
