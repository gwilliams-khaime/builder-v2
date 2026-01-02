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
      <div className="text-sm font-medium text-gray-700">Button Settings</div>
      
      {/* Button Style */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Button Style</label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Primary</button>
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Secondary</button>
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Links</button>
        </div>
      </div>

      {/* Link Type */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Link Type</label>
        <select className="w-full px-3 py-2 border rounded text-xs" value={linkType}>
          <option value="none">None</option>
          <option value="external">External</option>
          <option value="section">Section</option>
          <option value="internal">Internal</option>
          <option value="product">Product</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        Component ID: {componentId || 'none'}
      </div>
    </div>
  );
}
