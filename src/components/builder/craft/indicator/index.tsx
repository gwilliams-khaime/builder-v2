"use client";

import { useEditor } from "@craftjs/core";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

import { SectionToolbar, ElementToolbar, HoverIndicator } from "./components";
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
  // Get editor state
  const { 
    selectedId, 
    hoveredId, 
    selectedDom, 
    hoveredDom, 
    selectedNode, 
    hoveredNode, 
    enabled, 
    allNodes 
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

  // Position state
  const [selectedPos, setSelectedPos] = useState<IndicatorPosition | null>(null);
  const [hoveredPos, setHoveredPos] = useState<IndicatorPosition | null>(null);
  const [mounted, setMounted] = useState(false);

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

  // Toolbar action handlers (log for now)
  const handleMoveUp = () => console.log("Move Up clicked", { selectedId, selectedType });
  const handleMoveDown = () => console.log("Move Down clicked", { selectedId, selectedType });
  const handleMoveLeft = () => console.log("Move Left clicked", { selectedId, selectedType });
  const handleMoveRight = () => console.log("Move Right clicked", { selectedId, selectedType });
  const handleLink = () => console.log("Link clicked", { selectedId, selectedType });
  const handleResize = () => console.log("Resize clicked", { selectedId, selectedType });
  const handleDuplicate = () => console.log("Duplicate clicked", { selectedId, selectedType });
  const handleDelete = () => console.log("Delete clicked", { selectedId, selectedType });
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
        onMoveLeft={handleMoveLeft}
        onMoveRight={handleMoveRight}
        onLink={handleLink}
        onResize={handleResize}
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
    </>,
    document.body
  );
};
