'use client';

import { useState } from 'react';

interface FooterSettingsProps {
  freeTrialEnded: boolean;
}

// UI-only Footer Settings - removed all GrapesJS integrations
export const FooterSettings = ({ freeTrialEnded }: FooterSettingsProps) => {
  // Mock state
  const [colorScheme] = useState<'light' | 'dark' | 'brand'>('light');
  const [showAddress] = useState<boolean>(true);
  const [showPhone] = useState<boolean>(true);
  const [showEmail] = useState<boolean>(true);
  const [showNewsletter] = useState<boolean>(true);
  const [logoType] = useState<'icon' | 'word'>('icon');

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Footer Settings</div>
      
      {/* Color Scheme */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Color Scheme</label>
        <select className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs" value={colorScheme}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="brand">Brand</option>
        </select>
      </div>

      {/* Logo Type */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Logo Type</label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-secondary text-foreground hover:bg-panel-hover rounded text-xs transition-colors">Icon</button>
          <button className="px-3 py-2 bg-secondary text-foreground hover:bg-panel-hover rounded text-xs transition-colors">Word</button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Contact Information</label>
        <div className="space-y-1">
          <label className="text-xs text-foreground flex items-center gap-2">
            <input type="checkbox" checked={showAddress} readOnly className="rounded accent-primary" />
            Show Address
          </label>
          <label className="text-xs text-foreground flex items-center gap-2">
            <input type="checkbox" checked={showPhone} readOnly className="rounded accent-primary" />
            Show Phone
          </label>
          <label className="text-xs text-foreground flex items-center gap-2">
            <input type="checkbox" checked={showEmail} readOnly className="rounded accent-primary" />
            Show Email
          </label>
        </div>
      </div>

      {/* Newsletter */}
      <div className="space-y-2">
        <label className="text-xs text-foreground flex items-center gap-2">
          <input type="checkbox" checked={showNewsletter} readOnly className="rounded accent-primary" />
          Show Newsletter
        </label>
      </div>
    </div>
  );
};
