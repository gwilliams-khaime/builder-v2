/**
 * Navbar section template JSON content
 */

import { TemplateNodeTree } from './hero-templates';

export const navbarTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: {
      type: { resolvedName: 'Section' },
      isCanvas: true,
      props: { background: '#1e293b', padding: '16px 20px', minHeight: 'auto', maxWidth: '1200px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 },
      displayName: 'Section',
      custom: { displayName: 'Navbar', componentType: 'navbar', isSection: true },
      nodes: ['logo', 'nav'],
      linkedNodes: {},
    },
    logo: {
      type: { resolvedName: 'Text' },
      isCanvas: false,
      props: { text: 'Logo', fontSize: 24, fontWeight: 700, color: '#ffffff', textAlign: 'left', tagName: 'h1' },
      displayName: 'Text',
      custom: { displayName: 'Logo', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
    nav: {
      type: { resolvedName: 'Container' },
      isCanvas: true,
      props: { background: 'transparent', padding: 0, flexDirection: 'row', alignItems: 'center', gap: 24 },
      displayName: 'Container',
      custom: { displayName: 'Navigation', isSection: false },
      parent: 'section',
      nodes: ['link1', 'link2', 'link3', 'link4'],
      linkedNodes: {},
    },
    link1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Home', fontSize: 14, fontWeight: 500, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'nav', nodes: [], linkedNodes: {} },
    link2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'About', fontSize: 14, fontWeight: 500, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'nav', nodes: [], linkedNodes: {} },
    link3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Services', fontSize: 14, fontWeight: 500, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'nav', nodes: [], linkedNodes: {} },
    link4: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Contact', fontSize: 14, fontWeight: 500, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'nav', nodes: [], linkedNodes: {} },
  },
};

export const navbarTemplate2: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: {
      type: { resolvedName: 'Section' },
      isCanvas: true,
      props: { background: '#ffffff', padding: '16px 20px', minHeight: 'auto', maxWidth: '1200px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 },
      displayName: 'Section',
      custom: { displayName: 'Navbar', componentType: 'navbar', isSection: true },
      nodes: ['navLeft', 'logo', 'navRight'],
      linkedNodes: {},
    },
    navLeft: {
      type: { resolvedName: 'Container' },
      isCanvas: true,
      props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 20 },
      displayName: 'Container',
      custom: { displayName: 'Left Nav', isSection: false },
      parent: 'section',
      nodes: ['link1', 'link2'],
      linkedNodes: {},
    },
    logo: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'BRAND', fontSize: 28, fontWeight: 800, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Logo', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    navRight: {
      type: { resolvedName: 'Container' },
      isCanvas: true,
      props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 20 },
      displayName: 'Container',
      custom: { displayName: 'Right Nav', isSection: false },
      parent: 'section',
      nodes: ['link3', 'link4'],
      linkedNodes: {},
    },
    link1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Products', fontSize: 14, fontWeight: 500, color: '#64748b' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'navLeft', nodes: [], linkedNodes: {} },
    link2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Solutions', fontSize: 14, fontWeight: 500, color: '#64748b' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'navLeft', nodes: [], linkedNodes: {} },
    link3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Pricing', fontSize: 14, fontWeight: 500, color: '#64748b' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'navRight', nodes: [], linkedNodes: {} },
    link4: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Contact', fontSize: 14, fontWeight: 500, color: '#64748b' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'navRight', nodes: [], linkedNodes: {} },
  },
};

export const navbarTemplate3: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: {
      type: { resolvedName: 'Section' },
      isCanvas: true,
      props: { background: '#0f172a', padding: '20px 24px', minHeight: 'auto', maxWidth: '1200px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 24 },
      displayName: 'Section',
      custom: { displayName: 'Navbar', componentType: 'navbar', isSection: true },
      nodes: ['logo', 'nav', 'cta'],
      linkedNodes: {},
    },
    logo: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '✨ Studio', fontSize: 22, fontWeight: 700, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Logo', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    nav: {
      type: { resolvedName: 'Container' },
      isCanvas: true,
      props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 32 },
      displayName: 'Container',
      custom: { displayName: 'Navigation', isSection: false },
      parent: 'section',
      nodes: ['link1', 'link2', 'link3'],
      linkedNodes: {},
    },
    link1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Features', fontSize: 14, fontWeight: 500, color: '#94a3b8' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'nav', nodes: [], linkedNodes: {} },
    link2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Pricing', fontSize: 14, fontWeight: 500, color: '#94a3b8' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'nav', nodes: [], linkedNodes: {} },
    link3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'About', fontSize: 14, fontWeight: 500, color: '#94a3b8' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'nav', nodes: [], linkedNodes: {} },
    cta: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Get Started', fontSize: 14, fontWeight: 600, color: '#0f172a', background: '#ffffff', padding: '10px 20px', borderRadius: 6 }, displayName: 'Button', custom: { displayName: 'CTA', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const navbarTemplate4: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: {
      type: { resolvedName: 'Section' },
      isCanvas: true,
      props: { background: 'transparent', padding: '20px 24px', minHeight: 'auto', maxWidth: '1200px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 },
      displayName: 'Section',
      custom: { displayName: 'Navbar', componentType: 'navbar', isSection: true },
      nodes: ['logo', 'nav', 'actions'],
      linkedNodes: {},
    },
    logo: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Starter', fontSize: 24, fontWeight: 700, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Logo', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    nav: {
      type: { resolvedName: 'Container' },
      isCanvas: true,
      props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 28 },
      displayName: 'Container',
      custom: { displayName: 'Navigation', isSection: false },
      parent: 'section',
      nodes: ['link1', 'link2', 'link3'],
      linkedNodes: {},
    },
    link1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Home', fontSize: 15, fontWeight: 500, color: '#475569' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'nav', nodes: [], linkedNodes: {} },
    link2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Features', fontSize: 15, fontWeight: 500, color: '#475569' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'nav', nodes: [], linkedNodes: {} },
    link3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Blog', fontSize: 15, fontWeight: 500, color: '#475569' }, displayName: 'Text', custom: { displayName: 'Nav Link', isSection: false }, parent: 'nav', nodes: [], linkedNodes: {} },
    actions: {
      type: { resolvedName: 'Container' },
      isCanvas: true,
      props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 12 },
      displayName: 'Container',
      custom: { displayName: 'Actions', isSection: false },
      parent: 'section',
      nodes: ['login', 'signup'],
      linkedNodes: {},
    },
    login: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Log in', fontSize: 14, fontWeight: 500, color: '#475569', background: 'transparent', padding: '10px 16px', borderRadius: 6 }, displayName: 'Button', custom: { displayName: 'Login', isSection: false }, parent: 'actions', nodes: [], linkedNodes: {} },
    signup: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Sign up', fontSize: 14, fontWeight: 600, color: '#ffffff', background: '#667eea', padding: '10px 20px', borderRadius: 6 }, displayName: 'Button', custom: { displayName: 'Signup', isSection: false }, parent: 'actions', nodes: [], linkedNodes: {} },
  },
};

export const NAVBAR_TEMPLATES: Record<string, TemplateNodeTree> = {
  'navbar-1': navbarTemplate1,
  'navbar-2': navbarTemplate2,
  'navbar-3': navbarTemplate3,
  'navbar-4': navbarTemplate4,
};
