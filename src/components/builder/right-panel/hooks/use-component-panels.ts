'use client';

import { useEditor } from '@craftjs/core';
import { useMemo } from 'react';

/**
 * Panel types that can be shown in the design panel
 */
export type PanelType = 
  | 'typography'
  | 'button'
  | 'asset'
  | 'background'
  | 'layout'
  | 'grid'
  | 'navbar-settings'
  | 'footer-settings'
  | 'product-settings'
  | 'contact-settings';

/**
 * Component type identifier
 */
export type ComponentTypeId = 
  | 'text'
  | 'button'
  | 'image'
  | 'video'
  | 'container'
  | 'section'
  | 'navbar'
  | 'footer'
  | 'product'
  | 'contact'
  | 'root'
  | 'default';

/**
 * Configuration mapping component types to their applicable panels
 */
const PANEL_CONFIG: Record<ComponentTypeId, PanelType[]> = {
  text: ['typography'],
  button: ['button'],
  image: ['asset'],
  video: ['asset'],
  container: ['background', 'layout'],
  section: ['background', 'layout'],
  navbar: ['navbar-settings'],
  footer: ['footer-settings'],
  product: ['product-settings'],
  contact: ['contact-settings'],
  root: ['background'],
  default: ['background', 'layout'],
};

/**
 * Get the component type from a Craft.js node
 */
function getComponentTypeFromNode(node: any): ComponentTypeId {
  if (!node) return 'default';

  // Get the type name from the node
  const nodeType = node.data?.type;
  let typeName = '';
  
  if (typeof nodeType === 'object' && nodeType !== null) {
    typeName = (nodeType.resolvedName || '').toLowerCase();
  } else if (typeof nodeType === 'string') {
    typeName = nodeType.toLowerCase();
  } else if (typeof nodeType === 'function') {
    typeName = (nodeType.craft?.displayName || nodeType.name || '').toLowerCase();
  }

  // Check for special section types first (navbar, footer, product, contact)
  const customType = (node.data?.custom?.componentType || '').toLowerCase();
  
  if (customType === 'navbar' || customType === 'navigation' || customType === 'header') {
    return 'navbar';
  }
  if (customType === 'footer') {
    return 'footer';
  }
  if (customType === 'product') {
    return 'product';
  }
  if (customType === 'contact') {
    return 'contact';
  }

  // Check base type
  if (typeName === 'text') return 'text';
  if (typeName === 'button') return 'button';
  if (typeName === 'image') return 'image';
  if (typeName === 'video') return 'video';
  if (typeName === 'container') return 'container';
  if (typeName === 'section') return 'section';
  if (typeName === 'root') return 'root';

  return 'default';
}

/**
 * Hook that returns the panels to show based on the selected component
 */
export function useComponentPanels() {
  const { selectedNode, selectedNodeId } = useEditor((state) => {
    const selectedIds = Array.from(state.events.selected);
    const selectedId = selectedIds.length > 0 ? selectedIds[0] : null;
    
    let node = null;
    if (selectedId && state.nodes[selectedId]) {
      node = state.nodes[selectedId];
    }
    
    return {
      selectedNode: node,
      selectedNodeId: selectedId,
    };
  });

  const result = useMemo(() => {
    const componentType = getComponentTypeFromNode(selectedNode);
    const panels = PANEL_CONFIG[componentType] || PANEL_CONFIG.default;
    
    return {
      componentType,
      panels,
      componentId: selectedNodeId || '',
      hasSelection: !!selectedNodeId,
      selectedNode, // Include the node so components can access its data
    };
  }, [selectedNode, selectedNodeId]);

  return result;
}

/**
 * Check if a specific panel should be shown
 */
export function shouldShowPanel(panels: PanelType[], panel: PanelType): boolean {
  return panels.includes(panel);
}
