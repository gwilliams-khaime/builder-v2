'use client';

import { useState } from 'react';

// UI-only Design Color Picker - removed all editor integrations
export function DesignColorPicker({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <div className="space-y-2">
      {label && <label className="text-xs text-gray-600">{label}</label>}
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded border cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border rounded text-xs"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
