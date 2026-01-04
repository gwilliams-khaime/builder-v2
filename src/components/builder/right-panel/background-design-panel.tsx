'use client';

import { useState } from 'react';

interface BackgroundDesignPanelProps {
  componentId: string;
}

// UI-only Background Design Panel - removed all GrapesJS integrations
export function BackgroundDesignPanel({ componentId }: BackgroundDesignPanelProps) {
  // Mock state
  const [backgroundStyle] = useState<'colour' | 'image' | 'video'>('colour');
  const [overlayStrength] = useState<'none' | 'light' | 'medium' | 'strong' | 'solid'>('none');
  const [backgroundColor] = useState<string>('#151515');

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Background Settings</div>
      
      {/* Background Style */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Background Style</label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-secondary text-foreground rounded text-xs hover:bg-panel-hover transition-colors">Colour</button>
          <button className="px-3 py-2 bg-secondary text-foreground rounded text-xs hover:bg-panel-hover transition-colors">Image</button>
          <button className="px-3 py-2 bg-secondary text-foreground rounded text-xs hover:bg-panel-hover transition-colors">Video</button>
        </div>
      </div>

      {/* Background Color */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Background Color</label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={backgroundColor}
            className="w-10 h-10 rounded border border-border"
            readOnly
          />
          <input
            type="text"
            value={backgroundColor}
            className="flex-1 px-3 py-2 border border-border bg-input text-foreground rounded text-xs"
            readOnly
          />
        </div>
      </div>

      {/* Overlay Strength */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Overlay Strength</label>
        <select className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs" value={overlayStrength}>
          <option value="none">None</option>
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="strong">Strong</option>
          <option value="solid">Solid</option>
        </select>
      </div>

      <div className="text-xs text-muted-foreground mt-4">
        Component ID: {componentId || 'none'}
      </div>
    </div>
  );
}
