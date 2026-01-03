/**
 * Template content index - exports all section templates and lookup functions
 */

import { TemplateNodeTree } from './hero-templates';
export type { TemplateNodeTree } from './hero-templates';

import { HERO_TEMPLATES } from './hero-templates';
import { NAVBAR_TEMPLATES } from './navbar-templates';
import { FOOTER_TEMPLATES } from './footer-templates';
import { ABOUT_TEMPLATES, BANNER_TEMPLATES } from './about-banner-templates';
import { TEAM_TEMPLATES } from './team-templates';
import { 
  FEATURES_TEMPLATES, 
  SERVICES_TEMPLATES, 
  GALLERY_TEMPLATES, 
  PRICING_TEMPLATES 
} from './features-services-templates';
import {
  CONTACT_TEMPLATES,
  FAQ_TEMPLATES,
  TESTIMONIALS_TEMPLATES,
  NEWSLETTER_TEMPLATES,
  SOCIALS_TEMPLATES,
  BLOGS_TEMPLATES,
  PRODUCT_TEMPLATES,
  CASE_STUDIES_TEMPLATES,
  WHY_JOIN_US_TEMPLATES,
  PRIVACY_POLICY_TEMPLATES,
  TERMS_OF_SERVICE_TEMPLATES,
  RESOURCES_TEMPLATES,
} from './remaining-templates';

// Combine all templates into one lookup map
const ALL_TEMPLATES: Record<string, TemplateNodeTree> = {
  ...HERO_TEMPLATES,
  ...NAVBAR_TEMPLATES,
  ...FOOTER_TEMPLATES,
  ...ABOUT_TEMPLATES,
  ...BANNER_TEMPLATES,
  ...TEAM_TEMPLATES,
  ...FEATURES_TEMPLATES,
  ...SERVICES_TEMPLATES,
  ...GALLERY_TEMPLATES,
  ...PRICING_TEMPLATES,
  ...CONTACT_TEMPLATES,
  ...FAQ_TEMPLATES,
  ...TESTIMONIALS_TEMPLATES,
  ...NEWSLETTER_TEMPLATES,
  ...SOCIALS_TEMPLATES,
  ...BLOGS_TEMPLATES,
  ...PRODUCT_TEMPLATES,
  ...CASE_STUDIES_TEMPLATES,
  ...WHY_JOIN_US_TEMPLATES,
  ...PRIVACY_POLICY_TEMPLATES,
  ...TERMS_OF_SERVICE_TEMPLATES,
  ...RESOURCES_TEMPLATES,
};

/**
 * Get template content by template ID
 * @param templateId - The template ID (e.g., 'hero-1', 'navbar-2')
 * @returns The template node tree or undefined if not found
 */
export function getTemplateContent(templateId: string): TemplateNodeTree | undefined {
  return ALL_TEMPLATES[templateId];
}

/**
 * Generate unique IDs for all nodes in a template
 * This prevents ID collisions when adding multiple sections
 */
export function cloneTemplateWithUniqueIds(template: TemplateNodeTree): TemplateNodeTree {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 6);
  const prefix = `${timestamp}-${random}`;
  
  const idMap: Record<string, string> = {};
  const clonedNodes: Record<string, any> = {};
  
  // First pass: create ID mappings
  Object.keys(template.nodes).forEach((oldId) => {
    idMap[oldId] = `${prefix}-${oldId}`;
  });
  
  // Second pass: clone nodes with new IDs
  Object.keys(template.nodes).forEach((oldId) => {
    const node = template.nodes[oldId];
    const newId = idMap[oldId];
    
    clonedNodes[newId] = {
      ...node,
      id: newId,
      data: node.data ? {
        ...node.data,
        parent: node.data.parent && idMap[node.data.parent] ? idMap[node.data.parent] : node.data.parent,
        nodes: node.data.nodes ? node.data.nodes.map((childId: string) => idMap[childId] || childId) : [],
      } : undefined,
      // Update parent reference (Craft.js format)
      parent: node.parent && idMap[node.parent] ? idMap[node.parent] : node.parent,
      // Update nodes array (children)
      nodes: node.nodes ? node.nodes.map((childId: string) => idMap[childId] || childId) : [],
      // Update linkedNodes
      linkedNodes: node.linkedNodes
        ? Object.fromEntries(
            Object.entries(node.linkedNodes).map(([key, value]) => [
              key,
              idMap[value as string] || value,
            ])
          )
        : {},
    };
  });
  
  return {
    rootNodeId: idMap[template.rootNodeId],
    nodes: clonedNodes,
  };
}

// Re-export individual template collections for direct access if needed
export {
  HERO_TEMPLATES,
  NAVBAR_TEMPLATES,
  FOOTER_TEMPLATES,
  ABOUT_TEMPLATES,
  BANNER_TEMPLATES,
  TEAM_TEMPLATES,
  FEATURES_TEMPLATES,
  SERVICES_TEMPLATES,
  GALLERY_TEMPLATES,
  PRICING_TEMPLATES,
  CONTACT_TEMPLATES,
  FAQ_TEMPLATES,
  TESTIMONIALS_TEMPLATES,
  NEWSLETTER_TEMPLATES,
  SOCIALS_TEMPLATES,
  BLOGS_TEMPLATES,
  PRODUCT_TEMPLATES,
  CASE_STUDIES_TEMPLATES,
  WHY_JOIN_US_TEMPLATES,
  PRIVACY_POLICY_TEMPLATES,
  TERMS_OF_SERVICE_TEMPLATES,
  RESOURCES_TEMPLATES,
};
