"use client";

import { useEditor } from "@craftjs/core";
import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/icons";
import { cn } from "@/lib/utils";

interface LayerItemProps {
  nodeId: string;
  depth?: number;
}

const LayerItem = ({ nodeId, depth = 0 }: LayerItemProps) => {
  const [expanded, setExpanded] = useState(nodeId === "ROOT");

  const { node, selectedNodeId, actions, childNodes, isHidden } = useEditor((state, query) => {
    const node = state.nodes[nodeId];
    const selectedIds = Array.from(state.events.selected);
    
    return {
      node,
      selectedNodeId: selectedIds.length > 0 ? selectedIds[0] : null,
      childNodes: node?.data?.nodes || [],
      isHidden: node?.data?.hidden,
    };
  });

  const handleSelect = useCallback(() => {
    actions.selectNode(nodeId);
    if (node?.dom) {
      node.dom.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [actions, nodeId, node]);

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  const toggleHidden = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.setHidden(nodeId, !isHidden);
  };

  if (!node) return null;

  const isSelected = selectedNodeId === nodeId;
  const displayName = node.data?.custom?.displayName || node.data?.displayName || "Component";
  const hasChildNodes = childNodes.length > 0;
  const componentName = node.data?.name;

  const renderIcon = () => {
    switch (componentName) {
      case "Text":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );
      case "Image":
        return <Icons.Gallery width={16} height={16} />;
      case "Button":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M8 12h8" />
          </svg>
        );
      case "Container":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        );
      case "Section":
      case "Root":
      default:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="select-none text-sm text-[#161616]">
      <div
        className={cn(
          "group flex items-center justify-between py-2 pr-3 cursor-pointer transition-colors",
          isSelected ? "bg-[#E0E0E0] font-medium" : "hover:bg-gray-100"
        )}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
        onClick={handleSelect}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Expand/collapse indicator */}
          <div 
            className={cn(
              "w-4 h-4 flex items-center justify-center transition-transform duration-200 cursor-pointer",
              hasChildNodes && "hover:bg-black/5 rounded"
            )}
            onClick={hasChildNodes ? toggleExpanded : undefined}
          >
            {hasChildNodes && (
              <Icons.ChevronDown 
                width={10} 
                height={10} 
                className={cn(
                  "text-[#545454] transition-transform duration-200",
                  !expanded && "-rotate-90"
                )} 
              />
            )}
          </div>
          
          {/* Component icon */}
          <div className="text-[#545454]">
            {renderIcon()}
          </div>
          
          {/* Component name */}
          <span className="truncate">{displayName}</span>
        </div>

        {/* Visibility Toggle - Show on hover or if hidden */}
        <button
          onClick={toggleHidden}
          className={cn(
            "p-1 rounded hover:bg-black/5 text-[#545454] transition-opacity",
            isHidden ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          {isHidden ? (
            <Icons.EyeClose width={14} height={14} />
          ) : (
            <Icons.EyeOpen width={14} height={14} />
          )}
        </button>
      </div>
      
      {/* Child nodes - Animated Accordion */}
      <AnimatePresence>
        {expanded && hasChildNodes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {childNodes.map((childId: string) => (
              <LayerItem key={childId} nodeId={childId} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * LayersPanel - Displays the component hierarchy tree
 * 
 * This component renders a tree view of all components in the editor,
 * allowing users to select components by clicking on them in the tree.
 */
export const LayersPanel = () => {
  const { rootNodeId } = useEditor((state) => ({
    rootNodeId: "ROOT",
  }));

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <LayerItem nodeId={rootNodeId} />
    </div>
  );
};
