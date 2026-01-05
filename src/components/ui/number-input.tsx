'use client';

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
