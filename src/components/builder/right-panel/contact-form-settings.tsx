'use client';

import { useState } from 'react';

interface ContactFormSettingsProps {
  selectedComponent: any | null;
}

// UI-only Contact Form Settings - removed all GrapesJS integrations
export const ContactFormSettings = ({ selectedComponent }: ContactFormSettingsProps) => {
  // Mock state
  const [formTitle] = useState<string>('Contact Us');
  const [showNameField] = useState<boolean>(true);
  const [showEmailField] = useState<boolean>(true);
  const [showMessageField] = useState<boolean>(true);

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700">Contact Form Settings</div>
      
      {/* Form Title */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Form Title</label>
        <input
          type="text"
          value={formTitle}
          className="w-full px-3 py-2 border rounded text-xs"
          readOnly
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Form Fields</label>
        <div className="space-y-1">
          <label className="text-xs flex items-center gap-2">
            <input type="checkbox" checked={showNameField} readOnly className="rounded" />
            Show Name Field
          </label>
          <label className="text-xs flex items-center gap-2">
            <input type="checkbox" checked={showEmailField} readOnly className="rounded" />
            Show Email Field
          </label>
          <label className="text-xs flex items-center gap-2">
            <input type="checkbox" checked={showMessageField} readOnly className="rounded" />
            Show Message Field
          </label>
        </div>
      </div>
    </div>
  );
};
