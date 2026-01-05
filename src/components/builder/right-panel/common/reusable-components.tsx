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
        className="px-2 py-1 border border-border bg-secondary text-foreground rounded text-xs hover:bg-panel-hover transition-colors"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
        className="w-16 px-2 py-1 border border-border bg-input text-foreground rounded text-xs text-center"
      />
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="px-2 py-1 border border-border bg-secondary text-foreground rounded text-xs hover:bg-panel-hover transition-colors"
      >
        +
      </button>
    </div>
  );
}

export const CustomSegmentedControl = ({
  onChange,
  value,
  data,
  className,
  size = 'xs',
}: {
  onChange: (value: string) => void;
  value: string;
  data: {
    label: string | React.ReactNode;
    value: string;
  }[];
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}) => {
  return (
    <div
      className={`${className} grid grid-cols-${data.length} w-auto gap-2 rounded-lg p-1.5 bg-secondary`}
    >
      {data.map((v) => (
        <button
          key={v.value}
          onClick={() => onChange(v.value)}
          className={`px-3 py-2 rounded-lg text-[10px] w-full flex items-center justify-center  capitalize border transition-colors ${
            v.value === value
              ? 'bg-accent-subtle text-foreground border-foreground'
              : 'bg-card border-[0.5px] border-border'
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
};

export const ToolGroup = ({
  label,
  className,
  children,
  direction = 'row',
}: {
  label?: string | React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  direction?: 'row' | 'column';
}) => {
  return (
    <div
      className={`${className} flex ${direction === 'row' ? 'items-center justify-between' : 'flex-col items-start justify-start'} w-full gap-2`}
    >
      {label && (
        <div className="text-xs text-foreground line">
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

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
        className="rounded accent-primary"
      />
      <span className="text-xs text-foreground">{label}</span>
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
        className="w-full px-3 py-2 border border-border bg-input text-foreground rounded text-xs text-left"
      >
        {value.length > 0 ? `${value.length} selected` : placeholder || 'Select...'}
      </button>
      {open && (
        <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded shadow-lg">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 px-3 py-2 hover:bg-secondary cursor-pointer text-foreground"
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
                className="accent-primary"
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
