import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// General Preview Dropdown Component - can be used for any dropdown with previews
interface IconStyleDropdownProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  options: Array<{ label: string; value: T }>;
  iconStylesImgUrl: Record<T, string>;
  previewType?: 'image' | 'node'; // 'image' for URLs, 'node' for React components
  previewSize?: { width: string; height: string }; // Size for preview container
  className?: string;
}

const DropdownPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};


export const IconStyleDropdown = <T extends string>({
  
  value,
  onChange,
  disabled = false,
  options,
    iconStylesImgUrl,
  previewType = 'image',
  previewSize = { width: 'w-20', height: 'h-11' },
  className = '',
}: IconStyleDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom');
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownHeight = 400;
    const gap = 8;
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    const shouldOpenUp = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

    setPosition(shouldOpenUp ? 'top' : 'bottom');

    setDropdownStyles({
      position: 'fixed',
      left: `${triggerRect.left}px`,
      width: `${triggerRect.width}px`,
      zIndex: 9999,
      ...(shouldOpenUp
        ? { bottom: `${viewportHeight - triggerRect.top + gap}px` }
        : { top: `${triggerRect.bottom + gap}px` }),
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTrigger = triggerRef.current?.contains(target);
      const clickedDropdown = dropdownRef.current?.contains(target);

      if (!clickedTrigger && !clickedDropdown) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);
  const currentPreview = iconStylesImgUrl[value];

  const renderPreview = (previewValue: T, isTrigger?: boolean) => {
    const preview = iconStylesImgUrl[previewValue];
    if (!preview) return null;

    if (previewType === 'image' && typeof preview === 'string') {
      return (
        <img
          src={preview}
          alt={options.find((opt) => opt.value === previewValue)?.label || previewValue}
          className={cn("object-contain w-full h-full", !isTrigger && "p-2")}
        />
      );
    }

    return preview as React.ReactNode;
  };

  return (
    <div className={cn('relative w-full', className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full bg-input border border-border rounded-xl p-1 flex items-center gap-3 transition-all duration-200',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-stroke cursor-pointer'
        )}
      >
        <div
          className={cn(
            `${previewSize.width} ${previewSize.height} bg-secondary rounded-lg p-2 flex items-center justify-center flex-shrink-0 overflow-hidden`
          )}
        >
          {currentPreview && renderPreview(value, true)}
        </div>

        <span className="text-xs md:text-sm text-title flex-1 text-left font-medium truncate">
          {selectedOption?.label || 'Select option'}
        </span>

        <ChevronDown
          className={cn(
            'w-3 h-3 text-placeholder transition-transform duration-200 flex-shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <DropdownPortal>
          <div
            ref={dropdownRef}
            style={dropdownStyles}
            className={cn(
              'bg-popover rounded-xl border border-border shadow-lg overflow-hidden',
              'transition-opacity duration-200',
              position === 'top' ? 'origin-bottom' : 'origin-top'
            )}
          >
            <div className="max-h-72 overflow-y-auto">
              {options.map((option) => {
                const isSelected = value === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full p-3 flex items-center gap-3 transition-colors duration-150',
                      'hover:bg-secondary',
                      isSelected && 'bg-secondary'
                    )}
                  >
                    <div
                      className={cn(
                        `${previewSize.width} ${previewSize.height === 'h-11' ? 'h-14' : previewSize.height} bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden`,
                        isSelected && 'bg-input'
                      )}
                    >
                      {renderPreview(option.value)}
                    </div>

                    <span className="text-xs text-body flex-1 text-left font-normal">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </DropdownPortal>
      )}
    </div>
  );
};
