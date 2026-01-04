'use client';

import { Icons } from '@/icons';
import { Select, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { DesignColorPicker } from './common';
import PropertiesIcons from '@/icons/property-icons';
import { cn } from '@/lib/utils';
import { fontOptions } from '@/lib/static';

interface TypographyDesignPanelProps {
  componentId: string;
}


type TextAlignment = 'left' | 'center' | 'right' | 'justify';
type FontFamily = 'primary' | 'secondary' | string;

const TEXT_SIZE_OPTIONS = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Base', value: 'base' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: '2X Large', value: '2xl' },
  { label: '3X Large', value: '3xl' },
  { label: '4X Large', value: '4xl' },
];

const TEXT_ALIGNMENT_ICONS: Record<TextAlignment, typeof PropertiesIcons.AlignLeft> = {
  left: PropertiesIcons.AlignLeft,
  center: PropertiesIcons.AlignCenter,
  right: PropertiesIcons.AlignRight,
  justify: PropertiesIcons.AlignJustify,
};

const FONT_FAMILY_OPTIONS = [
  {
    group: 'Design Tokens',
    items: [
      { label: 'Primary (Heading)', value: 'primary' },
      { label: 'Secondary (Body)', value: 'secondary' },
    ],
  },
  {
    group: 'All Fonts',
    items: fontOptions.map((font) => ({
      label: font.label,
      value: font.value,
    })),
  },
];

export function TypographyDesignPanel({ componentId }: TypographyDesignPanelProps) {
  const [textSize] = useState<string>('16px');
  const [textColor] = useState<string>('#000000');
  const [textAlignment] = useState<TextAlignment>('left');
  const [fontFamily] = useState<FontFamily>('primary');
  return (
      <div className="space-y-4">
      {/* Text Size */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <label className="block text-xs font-light text-foreground">Text Size</label>
            <Tooltip
              label="Pick a text size. This helps keep your website's typography clean and consistent."
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <span>
                <Icons.Info className="w-4 h-4 text-muted-foreground" />
              </span>
            </Tooltip>
          </div>
        </div>
        <Select
          value={textSize}
          onChange={(value) => {}}
          data={TEXT_SIZE_OPTIONS}
          comboboxProps={{ zIndex: 100000000, withinPortal: true }}
          classNames={{
            input: 'border-border bg-input text-foreground w-full rounded-lg h-[32px] text-xs',
            dropdown: 'rounded-xl bg-popover',
            options: 'hover:rounded-xl font-light text-xs',
            option: 'text-xs p-3 text-foreground hover:bg-secondary',
          }}
        />
      </div>

      {/* Font Family */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <label className="block text-xs font-light text-foreground">Font Family</label>
            <Tooltip
              label="Choose the font style. Primary is typically for headings, Secondary is for body text."
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <span>
                <Icons.Info className="w-4 h-4 text-muted-foreground" />
              </span>
            </Tooltip>
          </div>
        </div>
        <Select
          value={fontFamily}
          onChange={(value) => {}}
          data={FONT_FAMILY_OPTIONS}
          comboboxProps={{ zIndex: 100000000, withinPortal: true }}
          classNames={{
            input: 'border-border bg-input text-foreground w-full rounded-lg h-[32px] text-xs',
            dropdown: 'rounded-xl bg-popover',
            options: 'hover:rounded-xl font-light text-xs',
            option: 'text-xs p-3 text-foreground hover:bg-secondary',
          }}
        />
      </div>

      {/* Text Colour */}
      <div className="flex items-center justify-between w-full py-2">
        <div className="flex items-center gap-1.5">
          <label className="block text-xs font-light text-foreground">Text Colour</label>
          <Tooltip
            label="Choose the colour your text will appear in. Dark colours = easier to read on light backgrounds; light colours = easier on dark backgrounds."
            multiline
            w={220}
            withArrow
            radius="md"
            styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
          >
            <span>
              <Icons.Info className="w-4 h-4 text-muted-foreground" />
            </span>
          </Tooltip>
        </div>
        <DesignColorPicker value={textColor} onChange={() => {}} />
      </div>

      {/* Text Alignment */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5">
          <label className="block text-xs font-light text-foreground">Text Alignment</label>
          <Tooltip
            label="Decide how your text sits. Left = natural reading Center = balanced and clean Right = stylized or for special layouts Justified = straight edges on both sides"
            multiline
            w={220}
            withArrow
            radius="md"
            styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
          >
            <span>
              <Icons.Info className="w-4 h-4 text-muted-foreground" />
            </span>
          </Tooltip>
        </div>
        <div className="grid grid-cols-4 w-full gap-1 bg-secondary rounded-lg p-1">
          {(['left', 'center', 'right', 'justify'] as TextAlignment[]).map((alignment) => {
            const Icon = TEXT_ALIGNMENT_ICONS[alignment];
            return (
              <button
                key={alignment}
                onClick={() =>  {}}
                className={cn(
                  'h-7 rounded-md text-[10px] shrink-0 w-full flex items-center justify-center border-[0.5px] transition-colors text-foreground',
                  textAlignment === alignment
                    ? 'dark:bg-primary/80 bg-primary/10 border-foreground'
                    : 'bg-card border-border'
                )}
              >
                <Icon className="w-4 h-4 text-white dark:text-" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
