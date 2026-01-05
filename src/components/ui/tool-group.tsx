'use client';

import { cn } from "@/lib/utils";

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
      className={cn(
        'flex w-full gap-2',
        direction === 'row' ? 'items-center justify-between' : 'flex-col items-start justify-start',
        className
      )}
    >
      {label && (
        <div className={cn(
          "text-xs text-foreground",
          direction === 'column' && 'w-full'
        )}>
          {label}
        </div>
      )}
      <div className={cn(direction === 'column' && 'w-full')}>
        {children}
      </div>
    </div>
  );
};
