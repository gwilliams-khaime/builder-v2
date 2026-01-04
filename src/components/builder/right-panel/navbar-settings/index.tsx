'use client';

import { useState } from 'react';

interface NavbarSettingsProps {
  freeTrialEnded: boolean;
}

// UI-only Navbar Settings - removed all GrapesJS integrations
export const NavbarSettings = ({ freeTrialEnded }: NavbarSettingsProps) => {
  // Mock state - replaced editor hooks with local state
  const [logoType] = useState<'image' | 'text'>('image');
  const [logoPosition] = useState<'left' | 'center' | 'right'>('center');
  const [showCartIcon] = useState<boolean>(true);
  const [colorScheme] = useState<'light' | 'dark'>('light');
  const [navigationStyle] = useState<'solid_sticky' | 'solid_not_sticky' | 'transparent_not_sticky' | 'transparent_solid_on_scroll'>('solid_sticky');

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Navbar Settings</div>
      
      {/* Logo Type */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Logo Type</label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-secondary text-foreground hover:bg-panel-hover rounded text-xs transition-colors">Image</button>
          <button className="px-3 py-2 bg-secondary text-foreground hover:bg-panel-hover rounded text-xs transition-colors">Text</button>
        </div>
      </div>

      {/* Logo Position */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Logo Position</label>
        <select className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs" value={logoPosition}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      {/* Color Scheme */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Color Scheme</label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-secondary text-foreground hover:bg-panel-hover rounded text-xs transition-colors">Light</button>
          <button className="px-3 py-2 bg-secondary text-foreground hover:bg-panel-hover rounded text-xs transition-colors">Dark</button>
        </div>
      </div>

      {/* Navigation Style */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Navigation Style</label>
        <select className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs" value={navigationStyle}>
          <option value="solid_sticky">Solid Sticky</option>
          <option value="solid_not_sticky">Solid Not Sticky</option>
          <option value="transparent_not_sticky">Transparent Not Sticky</option>
          <option value="transparent_solid_on_scroll">Transparent Solid on Scroll</option>
        </select>
      </div>

      {/* Show Cart Icon */}
      <div className="space-y-2">
        <label className="text-xs text-foreground flex items-center gap-2">
          <input type="checkbox" checked={showCartIcon} readOnly className="rounded accent-primary" />
          Show Cart Icon
        </label>
      </div>
    </div>
  );
};
