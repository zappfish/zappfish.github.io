import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { HierarchyTree, useNodeSearch, type OBOGraphNode, type HierarchyTreeHandle } from "frogpot";
import { useZPGraph } from "./hooks";
import "./PhenotypePicker.css";

type PhenotypePickerProps = {
  onSelectNode?: (node: OBOGraphNode) => void;
};

type ResultsPaneProps = {
  phenotypes: OBOGraphNode[];
  displayMode: "search" | "anatomy" | "empty";
  modeLabel: string;
  selectedZpNode: OBOGraphNode | null;
  onSelectNode: (node: OBOGraphNode) => void;
  globalHighlightText?: (text: string) => React.ReactNode;
  selectedPhenotypes: OBOGraphNode[];
  onAddPhenotype: (node: OBOGraphNode) => void;
};

function getZfinUsage(node: OBOGraphNode) {
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
      bpv.pred ==
      "http://www.geneontology.org/formats/oboInOwl#zapp:hasReferenceCount"
  );

  if (!zfinUsageNumber) return 0;

  return parseInt(zfinUsageNumber.val);
}

const RESULTS_PAGE_SIZE = 50;

function ResultsPane(props: ResultsPaneProps) {
  const { phenotypes, displayMode, modeLabel, selectedZpNode, onSelectNode, globalHighlightText, selectedPhenotypes, onAddPhenotype } = props;

  const selectedUris = useMemo(() => new Set(selectedPhenotypes.map(p => p.uri)), [selectedPhenotypes]);

  // Display limit for performance
  const [displayLimit, setDisplayLimit] = useState(RESULTS_PAGE_SIZE);

  // Secondary filter for filtering within results
  const { query: filterQuery, setQuery: setFilterQuery, results: filterResults, highlightText } = useNodeSearch(phenotypes);

  // Apply secondary filter if active
  const displayedPhenotypes = useMemo(() => {
    if (filterQuery.trim() && filterResults) {
      return filterResults.map(r => r.node);
    }
    return [...phenotypes].sort((a, b) => getZfinUsage(b) - getZfinUsage(a));
  }, [filterQuery, filterResults, phenotypes]);

  // Reset display limit when phenotypes or filter changes
  useEffect(() => {
    setDisplayLimit(RESULTS_PAGE_SIZE);
  }, [phenotypes, filterQuery]);

  // Limit results for performance
  const limitedPhenotypes = displayedPhenotypes.slice(0, displayLimit);
  const hasMore = displayedPhenotypes.length > displayLimit;

  const getModeIcon = () => {
    switch (displayMode) {
      case "search": return "🔍";
      case "anatomy": return "🐟";
      default: return "📋";
    }
  };

  return (
    <div className="phenotype-pane results-pane">
      <div className="phenotype-pane-header">
        <span className="pane-icon">{getModeIcon()}</span>
        <span className="results-title">
          {displayMode === "empty" ? "Phenotype Results" : modeLabel}
        </span>
      </div>

      {phenotypes.length > 0 && (
        <div className="phenotype-filter-box">
          <div className="phenotype-filter-row">
            <input
              type="text"
              placeholder="Filter within results..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="phenotype-filter-input"
            />
            {filterQuery && (
              <button
                className="phenotype-filter-clear"
                onClick={() => setFilterQuery("")}
                aria-label="Clear filter"
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}

      <div className="phenotype-pane-content">
        {displayMode === "empty" ? (
          <div className="phenotype-empty-state">
            <div className="empty-icon">🔍</div>
            <p>Search for phenotypes above, or select an anatomy term to browse</p>
          </div>
        ) : displayedPhenotypes.length === 0 ? (
          <div className="phenotype-empty-state">
            <div className="empty-icon">🔍</div>
            <p>No phenotypes match "{filterQuery}"</p>
          </div>
        ) : (
          <>
            <div className="phenotype-count">
              {hasMore
                ? `Showing ${limitedPhenotypes.length} of ${displayedPhenotypes.length} phenotypes`
                : `${displayedPhenotypes.length} phenotype${displayedPhenotypes.length !== 1 ? 's' : ''}`}
              {filterQuery && ` matching "${filterQuery}"`}
            </div>
            <ul className="phenotype-list">
              {limitedPhenotypes.map((node) => {
                const isAlreadySelected = selectedUris.has(node.uri);
                return (
                  <li
                    key={node.uri}
                    className={
                      "phenotype-item" +
                      (selectedZpNode?.uri === node.uri ? " active" : "") +
                      (isAlreadySelected ? " already-selected" : "")
                    }
                    onClick={() => onSelectNode(node)}
                  >
                    <div className="phenotype-item-content">
                      <div className="phenotype-label">
                        {filterQuery
                          ? highlightText(node.label || "")
                          : globalHighlightText
                            ? globalHighlightText(node.label || "")
                            : node.label}
                      </div>
                      <div className="phenotype-meta">
                        <span className="phenotype-id">
                          {node.uri.split("/").pop()}
                        </span>
                        <span className="phenotype-usage">
                          {getZfinUsage(node)} ZFIN references
                        </span>
                      </div>
                    </div>
                    <button
                      className={`phenotype-add-btn ${isAlreadySelected ? 'added' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isAlreadySelected) {
                          onAddPhenotype(node);
                        }
                      }}
                      disabled={isAlreadySelected}
                      title={isAlreadySelected ? "Already in list" : "Add to list"}
                    >
                      {isAlreadySelected ? "✓" : "+"}
                    </button>
                  </li>
                );
              })}
            </ul>
            {hasMore && (
              <button
                className="show-more-btn"
                onClick={() => setDisplayLimit(prev => prev + RESULTS_PAGE_SIZE)}
              >
                Show more ({displayedPhenotypes.length - displayLimit} remaining)
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function PhenotypePicker(props: PhenotypePickerProps) {
  const result = useZPGraph();
  const [anatomyPhenotypes, setAnatomyPhenotypes] = useState<OBOGraphNode[]>([]);
  const [selectedZpNode, setSelectedZpNode] = useState<OBOGraphNode | null>(null);
  const [selectedZfaNode, setSelectedZfaNode] = useState<OBOGraphNode | null>(null);
  const [selectedPhenotypes, setSelectedPhenotypes] = useState<OBOGraphNode[]>([]);
  const treeRef = useRef<HierarchyTreeHandle>(null);

  const addPhenotype = (node: OBOGraphNode) => {
    setSelectedPhenotypes(prev => {
      if (prev.some(p => p.uri === node.uri)) return prev;
      return [...prev, node];
    });
  };

  const removePhenotype = (uri: string) => {
    setSelectedPhenotypes(prev => prev.filter(p => p.uri !== uri));
  };

  const clearAllPhenotypes = () => {
    setSelectedPhenotypes([]);
  };

  // Get all phenotypes for global search - must be before early return
  const allPhenotypes = useMemo(() => {
    if (result.loading) return [];
    return result.zpHierarchy.items();
  }, [result]);

  // Global search
  const { query: globalQuery, setQuery: setGlobalQuery, results: globalResults, highlightText: globalHighlightText } = useNodeSearch(allPhenotypes);

  const isGlobalSearchActive = globalQuery.trim().length > 0;

  // Expand root node on initial load
  useEffect(() => {
    if (result.loading || !treeRef.current) return;
    const rootURI = result.zfaHierarchy.root.uri;
    // Expand the root by setting its path in expandPaths
    treeRef.current.setTreeState((prev) => ({
      ...prev,
      expandPaths: new Set([...prev.expandPaths, JSON.stringify([rootURI])]),
    }));
  }, [result.loading]);

  if (result.loading) {
    return (
      <div className="phenotype-picker-loading">
        <div className="loading-spinner"></div>
        <p>Loading zebrafish ontologies...</p>
      </div>
    );
  }

  const { zfaHierarchy, zpByZFA } = result;

  // Determine what to display
  let displayMode: "search" | "anatomy" | "empty";
  let displayedPhenotypes: OBOGraphNode[];
  let modeLabel: string;

  if (isGlobalSearchActive && globalResults) {
    displayMode = "search";
    displayedPhenotypes = globalResults.map(r => r.node);
    modeLabel = `Search results for "${globalQuery}"`;
  } else if (selectedZfaNode && anatomyPhenotypes.length > 0) {
    displayMode = "anatomy";
    displayedPhenotypes = anatomyPhenotypes;
    modeLabel = `Phenotypes for ${selectedZfaNode.label}`;
  } else if (selectedZfaNode) {
    displayMode = "anatomy";
    displayedPhenotypes = [];
    modeLabel = `No phenotypes for ${selectedZfaNode.label}`;
  } else {
    displayMode = "empty";
    displayedPhenotypes = [];
    modeLabel = "";
  }

  return (
    <div className="phenotype-picker-container">
      {/* Global Search Bar */}
      <div className="phenotype-picker-search-bar">
        <div className="global-search-wrapper">
          <span className="global-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search all phenotypes..."
            value={globalQuery}
            onChange={(e) => setGlobalQuery(e.target.value)}
            className="global-search-input"
          />
          {globalQuery && (
            <button
              className="global-search-clear"
              onClick={() => setGlobalQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="phenotype-picker">
        {/* Anatomy Facet Panel */}
        <div className={`phenotype-pane facet-pane ${isGlobalSearchActive ? 'disabled' : ''}`}>
          <div className="phenotype-pane-header">
            <span className="pane-icon">🐟</span>
            Filter by Anatomy
          </div>
          {isGlobalSearchActive && (
            <div className="facet-disabled-overlay">
              <p>Clear search to browse by anatomy</p>
            </div>
          )}
          <div className="phenotype-pane-content">
            <div className="hierarchy-tree-wrapper">
              <HierarchyTree
                ref={treeRef}
                key={zfaHierarchy.root.uri}
                hierarchy={zfaHierarchy}
                rootURI={zfaHierarchy.root.uri}
                onSelectNode={(node) => {
                  if (isGlobalSearchActive) return; // Ignore clicks when disabled
                  setSelectedZfaNode(node);
                  const nodes = zpByZFA?.get(node.uri);
                  if (!nodes) {
                    setAnatomyPhenotypes([]);
                  } else {
                    const sorted = [...nodes].sort((a, b) => getZfinUsage(b) - getZfinUsage(a));
                    setAnatomyPhenotypes(sorted);
                  }
                  setSelectedZpNode(null);
                }}
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <ResultsPane
          phenotypes={displayedPhenotypes}
          displayMode={displayMode}
          modeLabel={modeLabel}
          selectedZpNode={selectedZpNode}
          onSelectNode={(node) => {
            setSelectedZpNode(node);
            props.onSelectNode?.(node);
          }}
          globalHighlightText={isGlobalSearchActive ? globalHighlightText : undefined}
          selectedPhenotypes={selectedPhenotypes}
          onAddPhenotype={addPhenotype}
        />
      </div>

      {/* Selected Phenotypes List */}
      {selectedPhenotypes.length > 0 && (
        <div className="phenotype-selection-pane">
          <div className="phenotype-pane-header">
            <span className="pane-icon">📋</span>
            <span className="selection-title">
              Selected Phenotypes ({selectedPhenotypes.length})
            </span>
            <button
              className="clear-all-btn"
              onClick={clearAllPhenotypes}
              title="Clear all"
            >
              Clear All
            </button>
          </div>
          <div className="phenotype-selection-content">
            <ul className="selected-phenotype-list">
              {selectedPhenotypes.map((node) => (
                <li key={node.uri} className="selected-phenotype-item">
                  <div className="selected-phenotype-info">
                    <span className="selected-phenotype-label">{node.label}</span>
                    <span className="selected-phenotype-id">{node.uri.split("/").pop()}</span>
                  </div>
                  <div className="selected-phenotype-actions">
                    <button
                      className="copy-uri-btn"
                      onClick={() => navigator.clipboard.writeText(node.uri)}
                      title="Copy URI"
                    >
                      📋
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removePhenotype(node.uri)}
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="selection-actions">
              <button
                className="copy-all-btn"
                onClick={() => {
                  const uris = selectedPhenotypes.map(p => p.uri).join("\n");
                  navigator.clipboard.writeText(uris);
                }}
              >
                Copy All URIs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
