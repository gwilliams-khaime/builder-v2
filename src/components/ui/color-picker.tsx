import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  presetColors?: string[];
  showPresets?: boolean;
}

const DEFAULT_PRESET_COLORS = [
  '#0071FF',
  '#6B46FF',
  '#FF3B30',
  '#FF9500',
  '#FFCC00',
  '#34C759',
  '#00C7BE',
  '#5856D6',
  '#FF2D55',
  '#A2845E',
  '#8E8E93',
  '#000000',
  '#FFFFFF',
  '#F5F5F5',
  '#E0E0E0',
  '#BDBDBD',
  '#9E9E9E',
  '#757575',
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  error,
  className,
  size = 'sm',
  presetColors = DEFAULT_PRESET_COLORS,
  showPresets = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value.toUpperCase());
  const pickerRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Sync input value with prop value
  useEffect(() => {
    setInputValue(value.toUpperCase());
  }, [value]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          swatch: 'w-10 h-10',
          input: 'text-sm py-2 px-3',
          presetSwatch: 'w-8 h-8',
        };
      case 'lg':
        return {
          swatch: 'w-14 h-14',
          input: 'text-lg py-4 px-5',
          presetSwatch: 'w-10 h-10',
        };
      default:
        return {
          swatch: 'w-12 h-12',
          input: 'text-base py-3 px-4',
          presetSwatch: 'w-9 h-9',
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.toUpperCase();

    // Ensure it starts with #
    if (!newValue.startsWith('#')) {
      newValue = '#' + newValue;
    }

    setInputValue(newValue);

    // Validate hex color (3 or 6 digits after #)
    if (/^#([A-F0-9]{3}){1,2}$/i.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    onChange(newColor);
    setInputValue(newColor.toUpperCase());
  };

  const handlePresetClick = (color: string) => {
    onChange(color);
    setInputValue(color.toUpperCase());
    setIsOpen(false);
  };

  const isValidHexColor = (hex: string) => {
    return /^#([A-F0-9]{3}){1,2}$/i.test(hex);
  };

  return (
    <div className={clsx('space-y-2', className)}>
      {label && <label className="text-sm font-semibold text-gray-700 block">{label}</label>}

      <div className="relative" ref={pickerRef}>
        <div
          className={clsx(
            'flex items-center gap-3 px-3 py-2 border rounded-lg bg-white transition-colors cursor-pointer',
            error
              ? 'border-red-300 hover:border-red-400'
              : 'border-[#7C7C7C] hover:border-[#7C7C7C]',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {/* Color Swatch - wraps native color picker */}
          <div className="relative flex-shrink-0">
            <div
              className="w-8 h-8 rounded border border-gray-200"
              style={{ backgroundColor: isValidHexColor(value) ? value : '#FFFFFF' }}
            />

            {/* Native color input overlay - only accessible via direct click */}
            <input
              ref={colorInputRef}
              type="color"
              value={isValidHexColor(value) ? value : '#000000'}
              onChange={handleColorInputChange}
              disabled={disabled}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Use native color picker"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Hex Value Display */}
          <div className="flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setIsOpen(showPresets)}
              onClick={(e) => e.stopPropagation()}
              disabled={disabled}
              placeholder="#000000"
              maxLength={7}
              className={clsx(
                'w-full bg-transparent border-none outline-none font-mono text-sm uppercase',
                disabled && 'cursor-not-allowed'
              )}
            />
          </div>
        </div>

        {/* Preset Colors Dropdown */}
        {isOpen && showPresets && !disabled && (
          <div className="absolute z-90 top-full left-0 mt-2 bg-white border border-[#7C7C7C] rounded-xl shadow-lg   p-3 min-w-[280px] z-50">
            <p className="text-xs font-semibold text-gray-600 mb-2">Preset Colors</p>
            <div className="grid grid-cols-6 gap-2 bg-white">
              {presetColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handlePresetClick(color)}
                  className={clsx(
                    sizeClasses.presetSwatch,
                    'rounded-lg border-2 transition-all hover:scale-110',
                    value.toUpperCase() === color.toUpperCase()
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-gray-200 hover:border-gray-400'
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
};
