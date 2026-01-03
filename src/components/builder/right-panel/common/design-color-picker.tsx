'use client';

import { useEffect, useMemo, useState } from 'react';
import { Popover, ColorPicker } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Plus } from 'lucide-react';
import Color from 'color';
import { cn } from '@/lib/utils';
import { ColorPickerHue, ColorPickerSelection } from '@/components/ui/color-picker';
import { Icons } from '@/icons';

const DEFAULT_SWATCHES = ['#EA00FA', '#42C3FF', '#151515', '#D5D5D5', '#FFFFFF'];
const FALLBACK_COLOR = '#000000';

const isValidHex = (value: string) => /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(value.trim());

/**
 * Normalizes any CSS color value to hex format
 * Handles: hex, rgb, rgba, hsl, hsla, named colors, etc.
 */
const normalizeHex = (value?: string): string => {
  if (!value) return FALLBACK_COLOR;

  const trimmed = value.trim();
  if (!trimmed) return FALLBACK_COLOR;

  // Check for transparent or invalid values
  const lower = trimmed.toLowerCase();
  if (
    lower === 'transparent' ||
    lower === 'rgba(0, 0, 0, 0)' ||
    lower === 'rgba(0,0,0,0)' ||
    lower === 'none' ||
    lower === ''
  ) {
    return FALLBACK_COLOR;
  }

  try {
    // Use Color library to parse and convert any CSS color format to hex
    const color = Color(trimmed);
    // Check if alpha is 0 (transparent)
    if (color.alpha() === 0) {
      return FALLBACK_COLOR;
    }
    // Return uppercase hex without alpha
    return color.hex().toUpperCase();
  } catch (error) {
    // If parsing fails, try simple hex validation
    let next = trimmed.toUpperCase();
    if (!next.startsWith('#')) {
      next = `#${next}`;
    }
    if (isValidHex(next)) {
      return next;
    }
    return FALLBACK_COLOR;
  }
};

/**
 * Checks if a value is a valid color (not transparent/empty)
 */
const hasValidColor = (value?: string): boolean => {
  if (!value) return false;

  const trimmed = value.trim();
  if (!trimmed) return false;

  const lower = trimmed.toLowerCase();
  // Check for transparent, rgba with 0 opacity, or empty
  if (
    lower === 'transparent' ||
    lower === 'rgba(0, 0, 0, 0)' ||
    lower === 'rgba(0,0,0,0)' ||
    lower === '' ||
    lower === 'none'
  ) {
    return false;
  }

  try {
    // Use Color library to validate the color
    const color = Color(trimmed);
    // Check if alpha is 0 (transparent)
    if (color.alpha() === 0) {
      return false;
    }
    return true;
  } catch (error) {
    // Fallback to hex validation
    const normalized = lower.startsWith('#') ? lower : `#${lower}`;
    return isValidHex(normalized);
  }
};

interface DesignColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  triggerClassName?: string;
  dropdownWidth?: number;
}

export function DesignColorPicker({
  value,
  onChange,
  triggerClassName,
  dropdownWidth = 339.9999694824219,
}: DesignColorPickerProps) {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedColor, setSelectedColor] = useState(() => {
    if (hasValidColor(value)) {
      return normalizeHex(value);
    }
    return '';
  });
  const [hexInput, setHexInput] = useState(() => {
    if (hasValidColor(value)) {
      return normalizeHex(value);
    }
    return '#';
  });
  const [customSwatches, setCustomSwatches] = useState<string[]>([]);

  useEffect(() => {
    if (hasValidColor(value)) {
      const normalized = normalizeHex(value);
      setSelectedColor(normalized);
      setHexInput(normalized);
    } else {
      setSelectedColor('');
      setHexInput('#');
    }
  }, [value]);

  const swatches = useMemo(() => {
    const combined = [...DEFAULT_SWATCHES, ...customSwatches];
    return Array.from(new Set(combined.map((swatch) => normalizeHex(swatch))));
  }, [customSwatches]);

  const computedDropdownWidth = useMemo(() => {
    if (isMobile) {
      return Math.min(280, dropdownWidth);
    }
    return dropdownWidth;
  }, [isMobile, dropdownWidth]);

  const handleColorChange = (hex: string) => {
    const normalized = normalizeHex(hex);
    setSelectedColor(normalized);
    setHexInput(normalized);
    onChange(normalized);
  };

  const addCustomSwatch = () => {
    if (!selectedColor) return;
    const next = normalizeHex(selectedColor);
    if (!customSwatches.includes(next)) {
      setCustomSwatches((prev) => [...prev, next]);
    }
  };

  const hasColor = hasValidColor(selectedColor);
  const triggerColor = hasColor ? normalizeHex(selectedColor) : undefined;

  return (
    <div className="flex flex-col">
      <Popover
        opened={opened}
        onChange={setOpened}
        position="bottom-end"
        offset={6}
        withinPortal
        zIndex={isMobile ? 10000 : 2000}
        trapFocus={true}
      >
        <Popover.Target>
          <button
            type="button"
            aria-label="Open colour picker"
            onClick={() => setOpened((prev) => !prev)}
            className={cn(
              'rounded-lg flex items-center justify-center transition size-8 border-[0.5px] border-border',
              hasColor ? 'bg-[#151515]' : 'bg-white',
              triggerClassName
            )}
            style={hasColor ? { backgroundColor: triggerColor } : undefined}
          >
            {hasColor ? (
              <span className="bg-white rounded-full flex items-center justify-center w-4 h-4">
                <Plus className="w-3 h-3 text-black" strokeWidth={1.5} />
              </span>
            ) : (
              <Icons.ColorPicker className="size-8" />
            )}
          </button>
        </Popover.Target>
        <Popover.Dropdown
          className="rounded-2xl border border-[#E7E7E7] shadow-[] bg-white"
          style={{
            width: computedDropdownWidth,
            zIndex: 10000,
          }}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#323232]">Website Colours</p>
              <div className="flex flex-wrap items-center gap-2">
                {swatches.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={cn(
                      'w-[40.8px] h-[40.8px] border border-[#E0E0E0] rounded-[10.2px] transition-all'
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                    aria-label={`Select colour ${color}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={addCustomSwatch}
                  className="w-[40.8px] h-[40.8px] rounded-[10.2px] bg-white border border-dashed border-[#E0E0E0] hidden items-center justify-center"
                  aria-label="Add custom colour swatch"
                >
                  {' '}
                  <span className="bg-[#F6F6F6] rounded-full flex items-center justify-center w-4 h-4">
                    <Plus className="w-3 h-3 text-[#7C7C7C]" />
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <ColorPicker
                className="p-0 flex flex-col gap-2 w-full"
                value={hasColor ? selectedColor : FALLBACK_COLOR}
                onChange={handleColorChange}
              >
                <ColorPickerSelection
                  className={cn('rounded-2xl', isMobile ? 'h-[280px]' : 'h-[585.6000061035156px]')}
                />

                <ColorPickerHue
                  className={cn('rounded-2xl', isMobile ? 'h-[160px]' : 'h-[285.6000061035156px]')}
                />
              </ColorPicker>
              <div className="flex items-center justify-between gap-4 w-full">
                <span className="text-xs uppercase tracking-wide text-[#323232]">Hex</span>
                <div className="flex items-center gap-2 rounded-[10.2px] h-[34px] bg-[#F6F6F6] pl-1 pr-2 w-[105.5999984741211px] justify-end">
                  {hasColor && (
                    <span
                      className="w-[28px] h-[26px] shrink-0 rounded-[7px] border border-white/70"
                      style={{ backgroundColor: selectedColor }}
                    />
                  )}
                  <input
                    type="text"
                    value={hexInput}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    onKeyDown={(e) => {
                      const input = e.currentTarget;
                      const cursorPos = input.selectionStart || 0;

                      // Only prevent deletion of # when cursor is right after it
                      if (e.key === 'Backspace' && cursorPos === 1) {
                        e.preventDefault();
                        return;
                      }
                    }}
                    onChange={(e) => {
                      const inputValue = e.target.value;

                      // Only ensure # is at the start, don't interfere with typing
                      let processedValue = inputValue;
                      if (!processedValue.startsWith('#')) {
                        processedValue = `#${inputValue.replace(/#/g, '')}`;
                      }

                      // If empty, set to just #
                      if (processedValue === '') {
                        setHexInput('#');
                        return;
                      }

                      // Limit to 7 characters (# + 6 hex digits)
                      if (processedValue.length > 7) {
                        processedValue = processedValue.slice(0, 7);
                      }

                      // Only update the input - no picker updates while typing
                      setHexInput(processedValue);
                    }}
                    onBlur={(e) => {
                      // On blur, normalize and validate the input
                      const inputValue = e.target.value.trim();
                      if (inputValue === '' || inputValue === '#') {
                        if (hasValidColor(value)) {
                          const validColor = normalizeHex(value);
                          setHexInput(validColor);
                          setSelectedColor(validColor);
                        } else {
                          setHexInput('#');
                          setSelectedColor('');
                        }
                        return;
                      }

                      // Ensure # is present
                      const withHash = inputValue.startsWith('#') ? inputValue : `#${inputValue}`;
                      const normalized = normalizeHex(withHash);

                      if (isValidHex(normalized)) {
                        setHexInput(normalized);
                        setSelectedColor(normalized);
                        handleColorChange(normalized);
                      } else {
                        // Reset to previous valid color if input is invalid
                        if (hasValidColor(value)) {
                          const validColor = normalizeHex(value);
                          setHexInput(validColor);
                          setSelectedColor(validColor);
                        } else {
                          setHexInput('#');
                          setSelectedColor('');
                        }
                      }
                    }}
                    placeholder="#000000"
                    className="text-xs font-medium uppercase tracking-wide text-[#161616] bg-transparent border-none outline-none w-full text-right placeholder:text-[#161616]/50"
                    maxLength={7}
                  />
                </div>
              </div>
            </div>
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
