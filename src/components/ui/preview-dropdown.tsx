'use client';

import { useState } from 'react';

export function PreviewDropdown({
  options,
  value,
  onChange,
}: {
  options: Array<{ value: string; label: string; preview?: React.ReactNode }>;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs text-left flex items-center justify-between"
      >
        <span>{selected?.label || 'Select...'}</span>
        <span className="text-muted-foreground">▼</span>
      </button>
      {open && (
        <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="w-full px-3 py-2 hover:bg-secondary text-left text-xs text-foreground"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
