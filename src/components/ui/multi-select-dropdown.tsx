'use client';

import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const MultiSelectDropdown = ({
  selectedItems,
  options,
  onChange,
  disabled = false,
  className = '',
}: {
  selectedItems: string[];
  options: { label: string; value: string }[];
  onChange: (value: string, checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    width: number;
    openUpward: boolean;
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setPosition(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Calculate position when opening
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = options.length * 48 + 16; // Approximate height per option + padding
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const openUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

        setPosition({
          top: openUpward ? rect.top - dropdownHeight - 8 : rect.bottom + 8,
          left: rect.left,
          width: rect.width,
          openUpward,
        });
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, options.length]);

  const getDisplayText = () => {
    if (selectedItems.length === 0) return 'None';
    const selectedLabels = options
      .filter((opt) => selectedItems.includes(opt.value))
      .map((opt) => opt.label);
    const text = selectedLabels.join(', ');
    return text.length > 20 ? `${text.substring(0, 20)}...` : text;
  };

  const dropdownContent = isOpen && position && (
    <div
      ref={dropdownRef}
      className="fixed bg-popover border border-border rounded-xl border z-[9999] overflow-hidden shadow-lg"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        boxShadow: '0px 4px 16px 0px #0000001A',
      }}
    >
      {options.map((option, index) => {
        const isChecked = selectedItems.includes(option.value);
        return (
          <label
            key={option.value}
            className={`w-full px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-secondary transition-colors duration-150 ${
              index !== options.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => onChange(option.value, e.target.checked)}
              className="w-3 h-3 rounded border-border text-body focus:ring-2 focus:ring-primary focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-xs text-title">{option.label}</span>
          </label>
        );
      })}
    </div>
  );

return (
    <div className='flex flex-col gap-2'>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'w-[120px] h-[36px] border border-border bg-input rounded-lg p-2 flex items-center justify-between transition-all duration-200',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
            className
          )}
        >
          <span className="text-xs text-left line-clamp-1 text-title">{getDisplayText()}</span>
          <ChevronDown
            className={`w-3 h-3 text-placeholder transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
      {typeof document !== 'undefined' && createPortal(dropdownContent, document.body)}
    </div>
  );
};
