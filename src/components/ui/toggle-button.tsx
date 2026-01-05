'use client';

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
