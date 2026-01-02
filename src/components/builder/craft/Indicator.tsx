"use client";

import { useEditor } from "@craftjs/core";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

interface IndicatorPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Indicator component that shows hover/selection outlines
 * This follows Craft.js default behavior patterns
 */
export const Indicator = () => {
  const { selectedId, hoveredId, selectedDom, hoveredDom, selectedName, hoveredName, enabled } = useEditor((state) => {
    const selectedIds = Array.from(state.events.selected);
    const selectedId = selectedIds.length > 0 ? selectedIds[0] : null;
    const hoveredSet = state.events.hovered;
    const hoveredId = hoveredSet instanceof Set ? Array.from(hoveredSet)[0] : hoveredSet;
    
    let selectedDom: HTMLElement | null = null;
    let hoveredDom: HTMLElement | null = null;
    let selectedName = "";
    let hoveredName = "";
    
    if (selectedId && state.nodes[selectedId]) {
      selectedDom = state.nodes[selectedId].dom as HTMLElement | null;
      selectedName = state.nodes[selectedId].data?.custom?.displayName || 
                     state.nodes[selectedId].data?.displayName || 
                     "Component";
    }
    
    const hoveredIdStr = typeof hoveredId === 'string' ? hoveredId : null;
    if (hoveredIdStr && state.nodes[hoveredIdStr] && hoveredIdStr !== selectedId) {
      hoveredDom = state.nodes[hoveredIdStr].dom as HTMLElement | null;
      hoveredName = state.nodes[hoveredIdStr].data?.custom?.displayName || 
                    state.nodes[hoveredIdStr].data?.displayName || 
                    "Component";
    }
    
    return {
      selectedId,
      hoveredId: hoveredIdStr,
      selectedDom,
      hoveredDom,
      selectedName,
      hoveredName,
      enabled: state.options.enabled,
    };
  });

  const [selectedPos, setSelectedPos] = useState<IndicatorPosition | null>(null);
  const [hoveredPos, setHoveredPos] = useState<IndicatorPosition | null>(null);

  const updatePositions = useCallback(() => {
    if (selectedDom) {
      const rect = selectedDom.getBoundingClientRect();
      setSelectedPos({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setSelectedPos(null);
    }

    if (hoveredDom) {
      const rect = hoveredDom.getBoundingClientRect();
      setHoveredPos({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setHoveredPos(null);
    }
  }, [selectedDom, hoveredDom]);

  useEffect(() => {
    updatePositions();
    
    // Update on scroll and resize
    const handleUpdate = () => updatePositions();
    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);
    
    // Use ResizeObserver for element size changes
    const resizeObserver = new ResizeObserver(handleUpdate);
    if (selectedDom) resizeObserver.observe(selectedDom);
    if (hoveredDom) resizeObserver.observe(hoveredDom);

    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
      resizeObserver.disconnect();
    };
  }, [selectedDom, hoveredDom, updatePositions]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!enabled || !mounted) return null;

  return createPortal(
    <>
      {/* Hover indicator - dashed blue outline */}
      {hoveredPos && hoveredId !== selectedId && (
        <div
          style={{
            position: "fixed",
            top: hoveredPos.top - window.scrollY,
            left: hoveredPos.left - window.scrollX,
            width: hoveredPos.width,
            height: hoveredPos.height,
            border: "1px dashed #60a5fa",
            pointerEvents: "none",
            zIndex: 9998,
          }}
        >
          {/* Hover label */}
          <div
            style={{
              position: "absolute",
              top: -20,
              left: 0,
              background: "#42C3FF",
              color: "white",
              fontSize: "11px",
              padding: "2px 6px",
              borderRadius: "2px 2px 0 0",
              whiteSpace: "nowrap",
            }}
          >
            {hoveredName}
          </div>
        </div>
      )}

      {/* Selection indicator - solid blue outline */}
      {selectedPos && selectedId !== "ROOT" && (
        <div
          style={{
            position: "fixed",
            top: selectedPos.top - window.scrollY,
            left: selectedPos.left - window.scrollX,
            width: selectedPos.width,
            height: selectedPos.height,
            border: "3px solid #42C3FF",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          {/* Selection label with actions */}
          <div
            style={{
              position: "absolute",
              top: -24,
              left: -2,
              background: "#42C3FF",
              color: "white",
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "4px 4px 0 0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontWeight: 500 }}>{selectedName}</span>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};
