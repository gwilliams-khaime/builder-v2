/**
 * Utility functions for component identification
 * See TEMPLATE_COMPONENT_IDENTIFICATION.md for full documentation
 */

/**
 * Get the display name for a component node
 */
export const getComponentType = (node: any): string => {
  if (!node) return "Component";
  const customName = node.data?.custom?.displayName;
  const displayName = node.data?.displayName;
  
  // Handle type which can be object, string, or function
  let typeName = "";
  const nodeType = node.data?.type;
  if (typeof nodeType === 'object' && nodeType !== null) {
    typeName = nodeType.resolvedName || "";
  } else if (typeof nodeType === 'string') {
    typeName = nodeType;
  }
  
  return customName || displayName || typeName || "Component";
};

/**
 * Get the component type identifier for logic (lowercase)
 */
export const getComponentTypeId = (node: any): string => {
  if (!node) return "";
  const customType = (node.data?.custom?.componentType || "").toString().toLowerCase();
  const displayName = (node.data?.custom?.displayName || node.data?.displayName || "").toString().toLowerCase();
  
  // Handle type which can be object, string, or function
  let typeName = "";
  const nodeType = node.data?.type;
  if (typeof nodeType === 'object' && nodeType !== null) {
    typeName = (nodeType.resolvedName || "").toString().toLowerCase();
  } else if (typeof nodeType === 'string') {
    typeName = nodeType.toLowerCase();
  }
  
  return customType || displayName || typeName;
};

/**
 * Check if component is a SECTION type
 * 
 * A component is identified as a section if ANY of these are true:
 * 1. custom.isSection is explicitly true (MOST RELIABLE)
 * 2. type.resolvedName is "Section" or "Root"
 * 3. custom.componentType is one of the section types
 * 
 * NOTE: We do NOT check displayName for keywords because it's too error-prone
 * (e.g., "CTA Button" contains "cta" but is not a section)
 * 
 * Template developers MUST set custom.isSection = true for sections
 * or use custom.componentType with a valid section type
 */
export const isSectionType = (node: any): boolean => {
  if (!node) return false;
  
  // 1. Check explicit isSection flag - MOST RELIABLE
  if (node.data?.custom?.isSection === true) return true;
  
  // If explicitly set to false, it's NOT a section
  if (node.data?.custom?.isSection === false) return false;
  
  // 2. Check type.resolvedName - handle object, string, or function
  let typeName = "";
  const nodeType = node.data?.type;
  if (typeof nodeType === 'object' && nodeType !== null) {
    typeName = (nodeType.resolvedName || "").toString().toLowerCase();
  } else if (typeof nodeType === 'string') {
    typeName = nodeType.toLowerCase();
  }
  if (typeName === "section" || typeName === "root") return true;
  
  // 3. Check custom.componentType - must be an EXACT match
  const customType = (node.data?.custom?.componentType || "").toString().toLowerCase();
  const sectionTypes = ["section", "header", "footer", "navbar", "hero", "cta", "features", "navigation", "banner"];
  if (customType && sectionTypes.includes(customType)) return true;
  
  // Default: NOT a section
  return false;
};

/**
 * Check if section should show settings icon
 * Settings icon shown for: navbar, footer, product, contact, carousel
 */
export const shouldShowSettings = (node: any): boolean => {
  const typeId = getComponentTypeId(node);
  const settingsTypes = ["navbar", "footer", "product", "contact", "carousel", "navigation", "header"];
  return settingsTypes.some(t => typeId.includes(t));
};

/**
 * Check if it's the first section (navbar/header)
 */
export const isFirstSection = (nodeId: string, nodes: any): boolean => {
  const rootNode = nodes["ROOT"];
  if (!rootNode?.data?.nodes) return false;
  return rootNode.data.nodes[0] === nodeId;
};

/**
 * Check if it's the last section (footer)
 */
export const isLastSection = (nodeId: string, nodes: any): boolean => {
  const rootNode = nodes["ROOT"];
  if (!rootNode?.data?.nodes) return false;
  const childNodes = rootNode.data.nodes;
  return childNodes[childNodes.length - 1] === nodeId;
};

/**
 * Check if it's a navbar/header type
 */
export const isNavbarType = (node: any): boolean => {
  const typeId = getComponentTypeId(node);
  return typeId.includes("navbar") || typeId.includes("header") || typeId.includes("navigation");
};

/**
 * Check if it's a footer type
 */
export const isFooterType = (node: any): boolean => {
  const typeId = getComponentTypeId(node);
  return typeId.includes("footer");
};
