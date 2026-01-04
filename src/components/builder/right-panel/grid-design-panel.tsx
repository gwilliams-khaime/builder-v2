'use client';

import { useState } from 'react';

interface GridDesignPanelProps {
  componentId: string;
}

// UI-only Grid Design Panel - removed all GrapesJS integrations
export function GridDesignPanel({ componentId }: GridDesignPanelProps) {
  // Mock state
  const [gridColumns] = useState<string>('3');
  const [gridGap] = useState<string>('16px');

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Grid Settings</div>
      
      {/* Grid Columns */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Grid Columns</label>
        <input
          type="text"
          value={gridColumns}
          className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs"
          readOnly
        />
      </div>

      {/* Grid Gap */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Grid Gap</label>
        <input
          type="text"
          value={gridGap}
          className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs"
          readOnly
        />
      </div>

      <div className="text-xs text-muted-foreground mt-4">
        Component ID: {componentId || 'none'}
      </div>
    </div>
  );
}
