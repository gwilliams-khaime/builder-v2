/**
 * Utility functions for component identification
 * See TEMPLATE_COMPONENT_IDENTIFICATION.md for full documentation
 */

/**
 * Get the display name for a component node
 * - For SECTIONS: Returns custom.displayName (e.g., "Hero Section", "Footer")
 * - For ELEMENTS: Returns type name (e.g., "Button", "Text")
 */
export const getComponentType = (node: any): string => {
  if (!node) return "Component";
  
  // Get the type name first
  const nodeType = node.data?.type;
  let typeName = "";
  if (typeof nodeType === 'object' && nodeType !== null) {
    typeName = nodeType.resolvedName || "";
  } else if (typeof nodeType === 'string') {
    typeName = nodeType;
  } else if (typeof nodeType === 'function') {
    // Craft.js stores the component function directly
    typeName = nodeType.craft?.displayName || nodeType.name || "";
  }
  
  const displayName = node.data?.displayName;
  const customName = node.data?.custom?.displayName;
  const isSection = node.data?.custom?.isSection === true || 
                    typeName.toLowerCase() === "section" || 
                    typeName.toLowerCase() === "root";
  
  // For SECTIONS: show the custom display name (e.g., "Hero Section", "Footer")
  // For ELEMENTS: show the type name (e.g., "Button", "Text")
  if (isSection) {
    return customName || displayName || typeName || "Section";
  }
  
  return typeName || displayName || customName || "Component";
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

/**
 * Check if it's an image type
 */
export const isImageType = (node: any): boolean => {
  const typeId = getComponentTypeId(node);
  return typeId === "image" || typeId.includes("img");
};

/**
 * Check if it's a button type
 * Uses type.resolvedName directly for reliable detection
 */
export const isButtonType = (node: any): boolean => {
  if (!node) return false;
  const nodeType = node.data?.type;
  let typeName = "";
  if (typeof nodeType === 'object' && nodeType !== null) {
    typeName = (nodeType.resolvedName || "").toLowerCase();
  } else if (typeof nodeType === 'string') {
    typeName = nodeType.toLowerCase();
  } else if (typeof nodeType === 'function') {
    // Craft.js stores the component function directly, get displayName from craft property
    typeName = (nodeType.craft?.displayName || nodeType.name || "").toLowerCase();
  }
  return typeName === "button";
};

/**
 * Check if it's a text type
 * Uses type.resolvedName directly for reliable detection
 */
export const isTextType = (node: any): boolean => {
  if (!node) return false;
  const nodeType = node.data?.type;
  let typeName = "";
  if (typeof nodeType === 'object' && nodeType !== null) {
    typeName = (nodeType.resolvedName || "").toLowerCase();
  } else if (typeof nodeType === 'string') {
    typeName = nodeType.toLowerCase();
  } else if (typeof nodeType === 'function') {
    // Craft.js stores the component function directly, get displayName from craft property
    typeName = (nodeType.craft?.displayName || nodeType.name || "").toLowerCase();
  }
  return typeName === "text";
};

/**
 * Check if it's a link type
 */
export const isLinkType = (node: any): boolean => {
  const typeId = getComponentTypeId(node);
  return typeId === "link" || typeId.includes("anchor");
};

/**
 * Check if component should show link icon
 * Link icon shown for: buttons, links, and text elements
 */
export const shouldShowLinkIcon = (node: any): boolean => {
  return isButtonType(node) || isLinkType(node) || isTextType(node);
};

/**
 * Check if component should show resize icon
 * Resize icon only shown for images
 */
export const shouldShowResizeIcon = (node: any): boolean => {
  return isImageType(node);
};

/**
 * Check if component should show replace media icon
 * Replace media icon only shown for images
 */
export const shouldShowReplaceMediaIcon = (node: any): boolean => {
  return isImageType(node);
};
