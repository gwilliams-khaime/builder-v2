// UI-only hover preset manager - removed all editor integrations

import { HoverPresetType } from './hover-presets';

export function applyHoverPreset(
  componentId: string,
  preset: HoverPresetType,
  options?: {
    overlayColor?: string;
    opacity?: number;
    brightness?: number;
    scale?: number;
  }
): void {
  // UI-only: no-op, removed editor integration
  console.log('applyHoverPreset:', componentId, preset, options);
}

export function detectHoverPreset(componentId: string): HoverPresetType {
  // UI-only: return default
  return 'none';
}

export function extractHoverColors(componentId: string): {
  overlayColor?: string;
  opacity?: number;
  brightness?: number;
  scale?: number;
} {
  // UI-only: return empty object
  return {};
}
