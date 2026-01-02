// UI-only utility class manager - removed all editor integrations

export function replaceStandardClasses(
  componentId: string,
  oldClasses: string[],
  newClasses: string[]
): void {
  // UI-only: no-op, removed editor integration
  console.log('replaceStandardClasses:', componentId, oldClasses, newClasses);
}

export function applyUtilityClass(
  componentId: string,
  className: string
): void {
  // UI-only: no-op, removed editor integration
  console.log('applyUtilityClass:', componentId, className);
}
