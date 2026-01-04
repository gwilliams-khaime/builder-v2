'use client';

import { useState } from 'react';

interface ButtonDesignPanelProps {
  componentId: string;
}

// UI-only Button Design Panel - removed all GrapesJS integrations
export function ButtonDesignPanel({ componentId }: ButtonDesignPanelProps) {
  // Mock state
  const [buttonStyle] = useState<'primary' | 'secondary' | 'links'>('primary');
  const [linkType] = useState<'none' | 'external' | 'section' | 'internal' | 'product' | 'email' | 'phone'>('none');

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Button Settings</div>
      
      {/* Button Style */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Button Style</label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-secondary text-foreground hover:bg-panel-hover rounded text-xs transition-colors">Primary</button>
          <button className="px-3 py-2 bg-secondary text-foreground hover:bg-panel-hover rounded text-xs transition-colors">Secondary</button>
          <button className="px-3 py-2 bg-secondary text-foreground hover:bg-panel-hover rounded text-xs transition-colors">Links</button>
        </div>
      </div>

      {/* Link Type */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Link Type</label>
        <select className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs" value={linkType}>
          <option value="none">None</option>
          <option value="external">External</option>
          <option value="section">Section</option>
          <option value="internal">Internal</option>
          <option value="product">Product</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      <div className="text-xs text-muted-foreground mt-4">
        Component ID: {componentId || 'none'}
      </div>
    </div>
  );
}
