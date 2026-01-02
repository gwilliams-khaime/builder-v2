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
      <div className="text-sm font-medium text-gray-700">Footer Settings</div>
      
      {/* Color Scheme */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Color Scheme</label>
        <select className="w-full px-3 py-2 border rounded text-xs" value={colorScheme}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="brand">Brand</option>
        </select>
      </div>

      {/* Logo Type */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Logo Type</label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Icon</button>
          <button className="px-3 py-2 bg-gray-100 rounded text-xs">Word</button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Contact Information</label>
        <div className="space-y-1">
          <label className="text-xs flex items-center gap-2">
            <input type="checkbox" checked={showAddress} readOnly className="rounded" />
            Show Address
          </label>
          <label className="text-xs flex items-center gap-2">
            <input type="checkbox" checked={showPhone} readOnly className="rounded" />
            Show Phone
          </label>
          <label className="text-xs flex items-center gap-2">
            <input type="checkbox" checked={showEmail} readOnly className="rounded" />
            Show Email
          </label>
        </div>
      </div>

      {/* Newsletter */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600 flex items-center gap-2">
          <input type="checkbox" checked={showNewsletter} readOnly className="rounded" />
          Show Newsletter
        </label>
      </div>
    </div>
  );
};
