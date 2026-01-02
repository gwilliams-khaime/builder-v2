// UI-only color utilities - removed all editor integrations

export function normalizeColorValue(value?: string): string {
  if (!value) return '';
  let next = value.trim().toLowerCase();
  if (next.startsWith('#')) {
    if (next.length === 4) {
      next = `#${next[1]}${next[1]}${next[2]}${next[2]}${next[3]}${next[3]}`;
    }
    return next;
  }
  const rgbMatch = next.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch.slice(1, 4).map((channel) => Number(channel));
    return (
      '#' +
      [r, g, b]
        .map((channel) => channel.toString(16).padStart(2, '0'))
        .join('')
        .toLowerCase()
    );
  }
  return next;
}

export function applyDesignColorValue(
  color: string,
  componentId: string
): void {
  // UI-only: no-op, removed editor integration
  console.log('applyDesignColorValue:', color, componentId);
}

export function getArbitraryColorFromClasses(classes: string[]): string | null {
  // UI-only: mock implementation
  return null;
}

export function clearDesignColorClasses(componentId: string): void {
  // UI-only: no-op, removed editor integration
  console.log('clearDesignColorClasses:', componentId);
}
