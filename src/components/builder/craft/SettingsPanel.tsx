"use client";

import { useEditor } from "@craftjs/core";
import React from "react";

/**
 * SettingsPanel - Component for editing selected node properties
 * 
 * This component uses Craft.js useEditor hook to get the selected component
 * and render its settings. Each user component can define a related settings
 * component that will be rendered here.
 */
export const SettingsPanel = () => {
  const { selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent("selected").first();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId]?.data?.name,
        settings: state.nodes[currentNodeId]?.related?.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  if (!isEnabled) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-sm">Editor is disabled</p>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-sm">Select a component to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold mb-4 text-gray-700">
        {selected.name || "Component"} Settings
      </h3>
      {selected.settings && React.createElement(selected.settings)}
    </div>
  );
};

/**
 * Hook to get the current editor state
 * Useful for external components that need to interact with the editor
 */
export const useEditorState = () => {
  return useEditor((state, query) => {
    const selectedNodeIds = Array.from(state.events.selected);
    const selectedNodeId = selectedNodeIds.length > 0 ? selectedNodeIds[0] : null;
    
    return {
      selectedNodeId,
      selectedNode: selectedNodeId ? state.nodes[selectedNodeId] : null,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
      isEnabled: state.options.enabled,
    };
  });
};

/**
 * Hook to get editor actions
 * Provides methods to manipulate the editor state
 */
export const useEditorActions = () => {
  const { actions, query } = useEditor();
  
  return {
    // Undo/Redo
    undo: () => actions.history.undo(),
    redo: () => actions.history.redo(),
    
    // Selection
    selectNode: (nodeId: string) => actions.selectNode(nodeId),
    clearSelection: () => actions.clearEvents(),
    
    // Delete
    deleteNode: (nodeId: string) => actions.delete(nodeId),
    
    // Enable/Disable editor
    setEnabled: (enabled: boolean) => actions.setOptions((options) => {
      options.enabled = enabled;
    }),
    
    // Serialize
    serialize: () => query.serialize(),
    
    // Deserialize
    deserialize: (json: string) => actions.deserialize(json),
  };
};
