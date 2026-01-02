// UI-only hover presets - removed all editor integrations

export type HoverPresetType = 'none' | 'overlay' | 'brightness' | 'scale' | 'combined';

export interface HoverPreset {
  type: HoverPresetType;
  label: string;
  overlayColor?: string;
  opacity?: number;
  brightness?: number;
  scale?: number;
}

export const HOVER_PRESETS: HoverPreset[] = [
  { type: 'none', label: 'None' },
  { type: 'overlay', label: 'Overlay', overlayColor: '#000000', opacity: 0.15 },
  { type: 'brightness', label: 'Brightness', brightness: 0.9 },
  { type: 'scale', label: 'Scale', scale: 1.05 },
  { type: 'combined', label: 'Combined', overlayColor: '#000000', opacity: 0.15, brightness: 0.9, scale: 1.05 },
];

export function getPresetsForElementType(elementType: string): HoverPreset[] {
  // UI-only: return all presets
  return HOVER_PRESETS;
}
