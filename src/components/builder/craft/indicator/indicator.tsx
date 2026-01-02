"use client";

import { useEditor } from "@craftjs/core";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

import { SectionToolbar, ElementToolbar, HoverIndicator } from "./components";
import { DeleteConfirmationModal } from "./delete-confirmation-modal";
import { 
  getComponentType, 
  isSectionType, 
  shouldShowSettings,
  isFirstSection,
  isLastSection,
  isNavbarType,
  isFooterType,
} from "./utils";
import type { IndicatorPosition } from "./types";

/**
 * Indicator component that shows hover/selection outlines with toolbar
 * 
 * This component renders:
 * - Selection border around selected component
 * - Toolbar with action buttons
 * - Add Section buttons for sections
 * - Hover indicator for hovered components
 */
export const Indicator = () => {
  // Get editor state and actions
  const { 
    selectedId, 
    hoveredId, 
    selectedDom, 
    hoveredDom, 
    selectedNode, 
    hoveredNode, 
    enabled, 
    allNodes,
  } = useEditor((state) => {
    const selectedIds = Array.from(state.events.selected);
    const selectedId = selectedIds.length > 0 ? selectedIds[0] : null;
    const hoveredSet = state.events.hovered;
    const hoveredId = hoveredSet instanceof Set ? Array.from(hoveredSet)[0] : hoveredSet;
    
    let selectedDom: HTMLElement | null = null;
    let hoveredDom: HTMLElement | null = null;
    let selectedNode = null;
    let hoveredNode = null;
    
    if (selectedId && state.nodes[selectedId]) {
      selectedDom = state.nodes[selectedId].dom as HTMLElement | null;
      selectedNode = state.nodes[selectedId];
    }
    
    const hoveredIdStr = typeof hoveredId === 'string' ? hoveredId : null;
    if (hoveredIdStr && state.nodes[hoveredIdStr] && hoveredIdStr !== selectedId) {
      hoveredDom = state.nodes[hoveredIdStr].dom as HTMLElement | null;
      hoveredNode = state.nodes[hoveredIdStr];
    }
    
    return {
      selectedId,
      hoveredId: hoveredIdStr,
      selectedDom,
      hoveredDom,
      selectedNode,
      hoveredNode,
      enabled: state.options.enabled,
      allNodes: state.nodes,
    };
  });
  
  // Get actions and query from useEditor
  const { actions: editorActions, query: editorQuery } = useEditor();

  // Position state
  const [selectedPos, setSelectedPos] = useState<IndicatorPosition | null>(null);
  const [hoveredPos, setHoveredPos] = useState<IndicatorPosition | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mount check for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update positions based on DOM elements
  const updatePositions = useCallback(() => {
    if (selectedDom) {
      const rect = selectedDom.getBoundingClientRect();
      setSelectedPos({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setSelectedPos(null);
    }

    if (hoveredDom) {
      const rect = hoveredDom.getBoundingClientRect();
      setHoveredPos({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setHoveredPos(null);
    }
  }, [selectedDom, hoveredDom]);

  // Listen for scroll, resize, and periodic updates
  useEffect(() => {
    updatePositions();
    
    const handleUpdate = () => updatePositions();
    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);
    
    // Periodic update for dynamic content
    const interval = setInterval(updatePositions, 100);

    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
      clearInterval(interval);
    };
  }, [selectedDom, hoveredDom, updatePositions]);

  // Don't render if not enabled or not mounted (SSR)
  if (!enabled || !mounted) return null;

  // Derive component information
  const selectedType = getComponentType(selectedNode);
  const hoveredType = getComponentType(hoveredNode);
  const isSelectedSection = isSectionType(selectedNode);
  const isHoveredSection = isSectionType(hoveredNode);
  const showSettings = shouldShowSettings(selectedNode);

  // Move section up in the tree
  const handleMoveUp = () => {
    if (!selectedId) return;
    
    const rootNode = allNodes["ROOT"];
    if (!rootNode?.data?.nodes) return;
    
    const siblings = rootNode.data.nodes;
    const currentIndex = siblings.indexOf(selectedId);
    
    if (currentIndex > 0) {
      // Move the node up by swapping with the previous sibling
      editorActions.move(selectedId, "ROOT", currentIndex - 1);
    }
  };

  // Move section down in the tree
  const handleMoveDown = () => {
    if (!selectedId) return;
    
    const rootNode = allNodes["ROOT"];
    if (!rootNode?.data?.nodes) return;
    
    const siblings = rootNode.data.nodes;
    const currentIndex = siblings.indexOf(selectedId);
    
    if (currentIndex < siblings.length - 1) {
      // Move the node down by swapping with the next sibling
      editorActions.move(selectedId, "ROOT", currentIndex + 2);
    }
  };

  const handleMoveLeft = () => console.log("Move Left clicked", { selectedId, selectedType });
  const handleMoveRight = () => console.log("Move Right clicked", { selectedId, selectedType });
  const handleLink = () => console.log("Link clicked", { selectedId, selectedType });
  const handleResize = () => console.log("Resize clicked", { selectedId, selectedType });
  const handleReplaceMedia = () => console.log("Replace Media clicked", { selectedId, selectedType });

  /**
   * Generate a unique ID for cloned nodes
   */
  const generateUniqueId = () => {
    return `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Deep clone a node tree with new unique IDs
   */
  const cloneNodeTreeWithNewIds = (nodeTree: any): any => {
    const idMap: Record<string, string> = {};
    const clonedNodes: Record<string, any> = {};

    // First pass: create ID mappings
    Object.keys(nodeTree.nodes).forEach((oldId) => {
      idMap[oldId] = generateUniqueId();
    });

    // Second pass: clone nodes with new IDs and update references
    Object.keys(nodeTree.nodes).forEach((oldId) => {
      const node = nodeTree.nodes[oldId];
      const newId = idMap[oldId];

      clonedNodes[newId] = {
        ...node,
        id: newId,
        data: {
          ...node.data,
          // Update parent reference if it's within the cloned tree
          parent: node.data.parent && idMap[node.data.parent] 
            ? idMap[node.data.parent] 
            : node.data.parent,
          // Update children references
          nodes: node.data.nodes 
            ? node.data.nodes.map((childId: string) => idMap[childId] || childId)
            : [],
          // Update linkedNodes references if they exist
          linkedNodes: node.data.linkedNodes
            ? Object.fromEntries(
                Object.entries(node.data.linkedNodes).map(([key, value]) => [
                  key,
                  idMap[value as string] || value,
                ])
              )
            : undefined,
        },
      };
    });

    return {
      rootNodeId: idMap[nodeTree.rootNodeId],
      nodes: clonedNodes,
    };
  };

  // Duplicate the selected component
  const handleDuplicate = () => {
    if (!selectedId || selectedId === "ROOT") return;
    
    try {
      // Get the parent of the selected node
      const parentId = selectedNode?.data?.parent;
      if (!parentId) return;
      
      const parentNode = allNodes[parentId];
      if (!parentNode?.data?.nodes) return;
      
      // Find the current index in parent's children
      const siblings = parentNode.data.nodes;
      const currentIndex = siblings.indexOf(selectedId);
      
      // Get the node tree of the selected node
      const originalTree = editorQuery.node(selectedId).toNodeTree();
      
      // Clone with new unique IDs
      const clonedTree = cloneNodeTreeWithNewIds(originalTree);
      
      // Add the cloned tree right after the current one
      editorActions.addNodeTree(clonedTree, parentId, currentIndex + 1);
    } catch (error) {
      console.error("Failed to duplicate component:", error);
    }
  };

  // Handle delete - shows modal for sections, direct delete for elements
  const handleDelete = () => {
    if (!selectedId || selectedId === "ROOT") return;
    
    if (isSelectedSection) {
      // Show confirmation modal for sections
      setShowDeleteModal(true);
    } else {
      // Direct delete for non-section elements
      try {
        // Check if node still exists before deleting
        const nodeExists = editorQuery.node(selectedId).get();
        if (nodeExists) {
          editorActions.delete(selectedId);
        }
      } catch (error) {
        console.error("Failed to delete component:", error);
      }
    }
  };

  // Confirm delete (called from modal)
  const handleConfirmDelete = () => {
    if (selectedId && selectedId !== "ROOT") {
      try {
        // Check if node still exists before deleting
        const nodeExists = editorQuery.node(selectedId).get();
        if (nodeExists) {
          editorActions.delete(selectedId);
        }
      } catch (error) {
        console.error("Failed to delete component:", error);
      }
    }
  };

  const handleMore = () => console.log("More options clicked", { selectedId, selectedType });
  const handleSettings = () => console.log("Settings clicked", { selectedId, selectedType });
  const handleReplace = () => console.log("Replace clicked", { selectedId, selectedType });
  const handleAddSectionTop = () => console.log("Add Section Top clicked", { selectedId, selectedType });
  const handleAddSectionBottom = () => console.log("Add Section Bottom clicked", { selectedId, selectedType });

  // Render section toolbar
  const renderSectionToolbar = () => {
    if (!selectedPos || !isSelectedSection || selectedId === "ROOT") return null;

    return (
      <SectionToolbar
        position={selectedPos}
        componentType={selectedType}
        showSettings={showSettings}
        isFirstSection={isFirstSection(selectedId!, allNodes)}
        isLastSection={isLastSection(selectedId!, allNodes)}
        isNavbar={isNavbarType(selectedNode)}
        isFooter={isFooterType(selectedNode)}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        onReplace={handleReplace}
        onDuplicate={handleDuplicate}
        onSettings={handleSettings}
        onDelete={handleDelete}
        onMore={handleMore}
        onAddSectionTop={handleAddSectionTop}
        onAddSectionBottom={handleAddSectionBottom}
      />
    );
  };

  // Render element toolbar
  const renderElementToolbar = () => {
    if (!selectedPos || isSelectedSection || selectedId === "ROOT") return null;

    return (
      <ElementToolbar
        position={selectedPos}
        componentType={selectedType}
        selectedNode={selectedNode}
        onMoveLeft={handleMoveLeft}
        onMoveRight={handleMoveRight}
        onLink={handleLink}
        onResize={handleResize}
        onReplaceMedia={handleReplaceMedia}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onMore={handleMore}
      />
    );
  };

  // Render hover indicator
  const renderHoverIndicator = () => {
    if (!hoveredPos || hoveredId === selectedId || hoveredId === "ROOT") return null;

    return (
      <HoverIndicator
        position={hoveredPos}
        componentType={hoveredType}
        isSection={isHoveredSection}
      />
    );
  };

  return createPortal(
    <>
      {renderHoverIndicator()}
      {isSelectedSection ? renderSectionToolbar() : renderElementToolbar()}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        componentType={selectedType}
      />
    </>,
    document.body
  );
};
