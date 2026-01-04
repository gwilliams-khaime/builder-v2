'use client';

import { useState } from 'react';

interface LayoutDesignPanelProps {
  componentId: string;
}

// UI-only Layout Design Panel - removed all GrapesJS integrations
export function LayoutDesignPanel({ componentId }: LayoutDesignPanelProps) {
  // Mock state
  const [display] = useState<'flex' | 'block' | 'grid'>('flex');
  const [flexDirection] = useState<'row' | 'column'>('row');
  const [justifyContent] = useState<'start' | 'center' | 'end' | 'between' | 'around'>('start');
  const [alignItems] = useState<'start' | 'center' | 'end' | 'stretch'>('start');

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Layout Settings</div>
      
      {/* Display */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Display</label>
        <select className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs" value={display}>
          <option value="flex">Flex</option>
          <option value="block">Block</option>
          <option value="grid">Grid</option>
        </select>
      </div>

      {/* Flex Direction */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Flex Direction</label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-secondary text-foreground hover:bg-panel-hover rounded text-xs transition-colors">Row</button>
          <button className="px-3 py-2 bg-secondary text-foreground hover:bg-panel-hover rounded text-xs transition-colors">Column</button>
        </div>
      </div>

      {/* Justify Content */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Justify Content</label>
        <select className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs" value={justifyContent}>
          <option value="start">Start</option>
          <option value="center">Center</option>
          <option value="end">End</option>
          <option value="between">Space Between</option>
          <option value="around">Space Around</option>
        </select>
      </div>

      {/* Align Items */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Align Items</label>
        <select className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs" value={alignItems}>
          <option value="start">Start</option>
          <option value="center">Center</option>
          <option value="end">End</option>
          <option value="stretch">Stretch</option>
        </select>
      </div>

      <div className="text-xs text-muted-foreground mt-4">
        Component ID: {componentId || 'none'}
      </div>
    </div>
  );
}
