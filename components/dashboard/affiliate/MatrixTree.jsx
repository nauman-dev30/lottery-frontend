"use client";

import React, { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  Handle,
  Position,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { RefreshCw, Download } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

/* ----------------------------- Theme / Colors ---------------------------- */
const DARK_BG = "#131037";
const NODE_BG = " rgba(147, 172, 211, 0.07)";
const NODE_BORDER = "#01011e";
const TEXT_COLOR = "#ffffff";
const TOOLTIP_BG = "#1a263d";
const TOOLTIP_COLOR = "#cfd7e0";



// Generate the tree


/* ---------------------- Helpers: wallet formatting/colors ------------------ */
const formatWalletAddress = (address) =>
  address ? `${address.slice(0, 3)}...${address.slice(-3)}` : "N/A";

const getWalletInitials = (address) =>
  address ? address.slice(0, 3).toUpperCase() : "??";

const getColorFromWallet = (address) => {
  if (!address) return "#999";
  const hash = address.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 55%)`;
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/* ------------- NEW: determine if static data contains explicit empties ------------- */

const hasExplicitEmptyNodes = (node) => {
  if (!node) return false;
  if (node.isEmpty === true) return true;
  if (Array.isArray(node.children)) {
    for (const c of node.children) {
      if (hasExplicitEmptyNodes(c)) return true;
    }
  }
  return false;
};


const CustomNode = ({ data, onSelectNode }) => {
  const [showTooltip, setShowTooltip] = useState(false);



  const walletColor = getColorFromWallet(data.walletAddress);
  const walletInitials = getWalletInitials(data.walletAddress);

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => onSelectNode && onSelectNode(data.id)}
      style={{
        borderTop: `4px solid ${data.borderColor || NODE_BORDER}`,
        background: NODE_BG,
        color: TEXT_COLOR,
        padding: "10px",
        borderRadius: "8px",
        background: NODE_BG,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        width: "auto",
        cursor: "pointer",
        position: "relative",

      }}
    >
      <Handle type="target" position={Position.Left} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            height: "36px",
            width: "36px",
            borderRadius: "50%",
            backgroundColor: walletColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "700",
            fontSize: "11px",
            flexShrink: 0,
            boxShadow: `0 0 8px ${walletColor}`,
          }}
          title={formatWalletAddress(data.walletAddress)}
        >
          {walletInitials}
        </div>
        <div style={{ marginLeft: "12px", overflow: "hidden", flex: 1 }}>
          <div
            style={{
              fontWeight: "700",
              fontSize: "14px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {formatWalletAddress(data.walletAddress)}
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} />

      {showTooltip && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "10px",
            backgroundColor: TOOLTIP_BG,
            color: TOOLTIP_COLOR,
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.8)",
            zIndex: 999999999,
            fontSize: "13px",
            minWidth: "220px",
            maxWidth: "340px",
            lineHeight: "1.4",
            whiteSpace: "normal",
            pointerEvents: "none",
          }}
        >
          <div style={{ fontWeight: "700", marginBottom: "8px", color: "#eee" }}>
            User Details
          </div>

          <div style={{ marginBottom: "6px", fontFamily: "monospace", fontSize: "12px" }}>
            <strong>Wallet:</strong> {formatWalletAddress(data.walletAddress)}
          </div>

          <div style={{ marginBottom: "6px" }}>
            <strong>Sponsored By:</strong> {formatWalletAddress(data.sponsorWallet) || "N/A"}
          </div>

          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: `8px solid ${TOOLTIP_BG}`,
            }}
          />
        </div>
      )}
    </div>
  );
};

/* ------------------------- Matrix tree creation --------------------------- */

const createMatrixTree = (node, maxDepth = 10, currentDepth = 0) => {
  if (!node || currentDepth >= maxDepth) return null;

  const matrixNode = { ...node, children: [] };

  if (node.children && node.children.length > 0) {
    // Process all children (not just L/R legs)
    matrixNode.children = node.children
      .map(child => createMatrixTree(child, maxDepth, currentDepth + 1))
      .filter(child => child !== null);
  }

  return matrixNode;
};

/* ----------------------- Process tree -> nodes/edges ---------------------- */



const processMatrixTreeData = (tree, x = 0, y = 0, parentId = null) => {
  const nodes = [];
  const edges = [];

  // Calculate subtree height (number of leaves)
  const calculateTreeHeight = (node) => {
    if (!node || !node.children || node.children.length === 0) {
      return 1; // Leaf node has height 1
    }
    return node.children.reduce(
      (sum, child) => sum + calculateTreeHeight(child),
      0
    );
  };

  const traverse = (node, x, y, parentId, level = 0) => {
    if (!node) return;

    const nodeId = node.id.toString();
    const borderColor = getRandomColor();

    // vertical spacing between siblings
    const nodeSpacing = 120;
    // horizontal spacing between levels
    const levelSpacing = 520;

    nodes.push({
      id: nodeId,
      position: { x, y },
      type: "customNode",
      data: { ...node, borderColor, sponsorWallet: node.sponsorWallet },

    });

    if (parentId) {
      edges.push({
        id: `e${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        type: "bezier",
      });
    }

    if (node.children && node.children.length > 0) {
      const totalChildHeight = node.children.reduce(
        (sum, child) => sum + calculateTreeHeight(child),
        0
      );

      // Center children vertically under parent
      let childY = y - (totalChildHeight * nodeSpacing) / 2 + nodeSpacing / 2;

      node.children.forEach((child) => {
        const childHeight = calculateTreeHeight(child);

        traverse(
          child,
          x + levelSpacing, // move right for next level
          childY + (childHeight * nodeSpacing) / 2,
          nodeId,
          level + 1
        );

        childY += childHeight * nodeSpacing; // move Y down for next child
      });
    }
  };

  traverse(tree, x, y, parentId);
  return { nodes, edges };
};

/* ------------------------- Find utilities (unchanged) -------------------- */
const findNodeById = (node, id) => {
  if (!node) return null;
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
};

const findNodeByUsername = (node, username) => {
  if (!node) return null;
  if (node.username && node.username.toLowerCase().includes(username.toLowerCase())) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeByUsername(child, username);
      if (found) return found;
    }
  }
  return null;
};

/* --------------------------- Export / Backup (unchanged) ------------------ */
const exportNodesToCSV = (nodes) => {
  if (!nodes || nodes.length === 0) return;
  const csvHeader =
    "ID,Email,WalletAddress,Referral\n";
  const csvRows = nodes
    .filter((n) => !n.data.isEmpty)
    .map((node) =>
      [
        node.id,
        `"${node.data.email || ''}"`,
        node.data.walletAddress,
        `"${node.data.sponsorWallet}"`,
      ].join(",")
    )
    .join("\n");

  const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", "matrix_tree_export.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


/* --------------------------- Controls component -------------------------- */
const TreeControls = ({ onReset, onExport, searchTerm, setSearchTerm, onSearchClear }) => (
  <div
    style={{
      display: "flex",
      gap: "10px",
      padding: "20px 24px",
      background: NODE_BG,
      borderBottom: `1px solid ${NODE_BORDER}`,
      borderRadius: '5px',
      alignItems: "center",
      flexWrap: "wrap",
    }}
  >
    <button
      type="button"
      onClick={onReset}
      title="Reset View"
      aria-label="Reset View"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 16px",
        background: "#2d3748",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600",
      }}
    >
      <RefreshCw size={16} />
      <span>Reset</span>
    </button>
    <button
      type="button"
      onClick={onExport}
      title="Export Tree to CSV"
      aria-label="Export Tree to CSV"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 16px",
        background: "#2d3748",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600",
      }}
    >
      <Download size={16} />
      <span>Export CSV</span>
    </button>
  </div>
);

/* ------------------------------ Flow wrapper ------------------------------ */
const Flow = ({ nodes, edges, onNodeClick }) => {
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    if (reactFlowInstance && nodes.length > 0) {
      setTimeout(() => {
        reactFlowInstance.fitView({
          padding: 0.15,
          includeHiddenNodes: false,
          minZoom: 0.3,
          maxZoom: 1.4,
        });
      }, 150);
    }
  }, [reactFlowInstance, nodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={{
        customNode: (props) => <CustomNode {...props} onSelectNode={onNodeClick} />,
      }}
      defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
      fitView
      attributionPosition="bottom-right"

      style={{ background: DARK_BG }}
    >
      <Background variant="dots" gap={20} size={1} color="#1f4068" />
      <Controls showInteractive={false} position="bottom-left" />
    </ReactFlow>
  );
};

/* ------------------------------- Main UI -------------------------------- */
const MatrixTree = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [fullTree, setFullTree] = useState(null);
  const [currentRootId, setCurrentRootId] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.user.userData);


  // Fetch tree data from API
  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        if (!userData?.walletAddress) {
          // Wait for wallet to load, or show specific message if not connected
          // For now, if no wallet, we might just set loading false or return
          if (loading) setLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/getTree`,
          {
            params: {
              walletAddress: userData.walletAddress
            }
          }
        );

        if (response.data.success) {
          const treeData = response.data.tree;
          const matrixTree = createMatrixTree(treeData, 11);
          setFullTree(matrixTree);
          const processed = processMatrixTreeData(matrixTree);
          setNodes(processed.nodes);
          setEdges(processed.edges);
          setCurrentRootId(treeData.id);
        } else {
          setError(response.data.message || "Failed to fetch tree data");
        }
      } catch (err) {
        console.error("Error fetching tree:", err);
        setError("Error fetching tree data");
      } finally {
        setLoading(false);
      }
    };

    fetchTreeData();
  }, [userData]);

  // Helper to update view with subtree from a given node id
  const showSubtreeById = useCallback(
    (id) => {
      if (!fullTree) return;
      setError("");
      const originalNode = findNodeById(fullTree, id);
      if (!originalNode) {
        setError("User not found.");
        return;
      }
      const subtree = createMatrixTree(originalNode, 11);
      const { nodes, edges } = processMatrixTreeData(subtree);
      setNodes(nodes);
      setEdges(edges);
      setCurrentRootId(id);
    },
    [fullTree]
  );

  // On node click -> show that node's subtree
  const handleNodeClick = useCallback(
    (nodeId) => {
      if (nodeId.startsWith("empty_")) return; // no action for empty node
      showSubtreeById(nodeId);
    },
    [showSubtreeById]
  );

  // On search submit, find user and show their subtree
  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      // Show full tree if search is empty
      if (!fullTree) return;
      const processed = processMatrixTreeData(fullTree);
      setNodes(processed.nodes);
      setEdges(processed.edges);
      setCurrentRootId(fullTree.id);
      setError("");
      return;
    }

    setError("");
  }, [searchTerm, fullTree, showSubtreeById]);

  // Clear search and show main tree
  const handleSearchClear = useCallback(() => {
    setSearchTerm("");
    if (!fullTree) return;
    const processed = processMatrixTreeData(fullTree);
    setNodes(processed.nodes);
    setEdges(processed.edges);
    setCurrentRootId(fullTree.id);
    setError("");
  }, [fullTree]);

  // Reset view & show main tree
  const handleReset = useCallback(() => {
    handleSearchClear();
  }, [handleSearchClear]);

  // Export current tree nodes to CSV download
  const handleExport = useCallback(() => {
    exportNodesToCSV(nodes);
  }, [nodes]);

  // On Enter key pressed in search input
  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      handleSearchClear();
    }
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: DARK_BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        Loading tree data...
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: DARK_BG,
        display: "flex",
        flexDirection: "column",
        borderRadius: '10px',
      }}
    >
      <TreeControls
        onReset={handleReset}
        onExport={handleExport}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchClear={handleSearchClear}
      />
      {error && (
        <div
          style={{
            color: "#ff5555",
            margin: "4px 16px",
            fontWeight: "700",
            fontSize: "13px",
          }}
          role="alert"
        >
          {error}
        </div>
      )}
      <div style={{ flexGrow: 1 }}>
        <ReactFlowProvider>
          <Flow nodes={nodes} edges={edges} onNodeClick={handleNodeClick} />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default MatrixTree;