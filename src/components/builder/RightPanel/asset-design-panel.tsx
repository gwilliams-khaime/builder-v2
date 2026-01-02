'use client';

import { useState } from 'react';

interface AssetDesignPanelProps {
  componentId: string;
}

// UI-only Asset Design Panel - removed all GrapesJS integrations
export function AssetDesignPanel({ componentId }: AssetDesignPanelProps) {
  // Mock state - replaced editor hooks with local state
  const [assetType] = useState<'image' | 'video'>('image');
  const [imageProperty] = useState<'full-image' | 'cover' | 'fit-width' | 'fit-height'>('cover');
  const [imageEffect] = useState<'original' | 'greyscale' | 'blur' | 'invert' | 'sepia' | 'cartoon'>('original');
  const [cornerRadius] = useState<'sharp' | 'soft' | 'rounded' | 'full-rounded'>('sharp');
  const [borderStyle] = useState<'none' | 'light' | 'medium' | 'bold'>('none');
  const [shadowType] = useState<'none' | 'soft' | 'medium' | 'hard'>('none');

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700">Asset Settings</div>
      
      {/* Asset Type Selector */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Asset Type</label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Image</button>
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Video</button>
        </div>
      </div>

      {/* Image Property */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Image Property</label>
        <select className="w-full px-3 py-2 border rounded text-xs" value={imageProperty}>
          <option value="full-image">Full Image</option>
          <option value="cover">Cover</option>
          <option value="fit-width">Fit Width</option>
          <option value="fit-height">Fit Height</option>
        </select>
      </div>

      {/* Image Effect */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Image Effect</label>
        <select className="w-full px-3 py-2 border rounded text-xs" value={imageEffect}>
          <option value="original">Original</option>
          <option value="greyscale">Greyscale</option>
          <option value="blur">Blur</option>
          <option value="invert">Invert</option>
          <option value="sepia">Sepia</option>
          <option value="cartoon">Cartoon</option>
        </select>
      </div>

      {/* Corner Radius */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Corner Radius</label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Sharp</button>
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Soft</button>
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Rounded</button>
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Full Rounded</button>
        </div>
      </div>

      {/* Border Style */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Border Style</label>
        <select className="w-full px-3 py-2 border rounded text-xs" value={borderStyle}>
          <option value="none">No Outline</option>
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="bold">Bold</option>
        </select>
      </div>

      {/* Shadow Type */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Shadow</label>
        <select className="w-full px-3 py-2 border rounded text-xs" value={shadowType}>
          <option value="none">None</option>
          <option value="soft">Soft</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        Component ID: {componentId || 'none'}
      </div>
    </div>
  );
}
