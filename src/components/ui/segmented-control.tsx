'use client';

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
          className={`px-3 py-2 rounded-lg text-[10px] w-full flex items-center justify-center capitalize border transition-colors ${
            v.value === value
              ? 'bg-primary-light dark:text-black border-foreground'
              : 'bg-card border-[0.5px] border-border'
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
};
