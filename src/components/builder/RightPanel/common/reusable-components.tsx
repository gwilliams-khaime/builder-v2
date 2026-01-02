'use client';

import { useState } from 'react';

// UI-only reusable components - removed all editor integrations

export function NumberIncrementerOrDecrementer({
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="px-2 py-1 border rounded text-xs"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
        className="w-16 px-2 py-1 border rounded text-xs text-center"
      />
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="px-2 py-1 border rounded text-xs"
      >
        +
      </button>
    </div>
  );
}

export function CustomSegmentedControl({
  options,
  value,
  onChange,
}: {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1 rounded text-xs ${
            value === option.value ? 'bg-white shadow' : 'text-gray-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function ToolGroup({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      {title && <div className="text-xs font-medium text-gray-700">{title}</div>}
      <div>{children}</div>
    </div>
  );
}

export function ToggleButton({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded"
      />
      <span className="text-xs text-gray-700">{label}</span>
    </label>
  );
}

export function MultiSelectDropdown({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: Array<{ value: string; label: string }>;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 border rounded text-xs text-left"
      >
        {value.length > 0 ? `${value.length} selected` : placeholder || 'Select...'}
      </button>
      {open && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...value, option.value]);
                  } else {
                    onChange(value.filter((v) => v !== option.value));
                  }
                }}
              />
              <span className="text-xs">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

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
        className="w-full px-3 py-2 border rounded text-xs text-left flex items-center justify-between"
      >
        <span>{selected?.label || 'Select...'}</span>
        <span>▼</span>
      </button>
      {open && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="w-full px-3 py-2 hover:bg-gray-100 text-left text-xs"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
