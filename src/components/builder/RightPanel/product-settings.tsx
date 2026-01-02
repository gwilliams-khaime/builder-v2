'use client';

import { useState } from 'react';

interface ProductSettingsProps {
  freeTrialEnded: boolean;
  selectedComponent: any | null;
}

// UI-only Product Settings - removed all GrapesJS integrations
export const ProductSettings = ({ freeTrialEnded, selectedComponent }: ProductSettingsProps) => {
  // Mock state
  const [productLayout] = useState<'grid' | 'list'>('grid');
  const [showPrice] = useState<boolean>(true);
  const [showDescription] = useState<boolean>(true);

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700">Product Settings</div>
      
      {/* Product Layout */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Product Layout</label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Grid</button>
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">List</button>
        </div>
      </div>

      {/* Display Options */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Display Options</label>
        <div className="space-y-1">
          <label className="text-xs flex items-center gap-2">
            <input type="checkbox" checked={showPrice} readOnly className="rounded" />
            Show Price
          </label>
          <label className="text-xs flex items-center gap-2">
            <input type="checkbox" checked={showDescription} readOnly className="rounded" />
            Show Description
          </label>
        </div>
      </div>
    </div>
  );
};
