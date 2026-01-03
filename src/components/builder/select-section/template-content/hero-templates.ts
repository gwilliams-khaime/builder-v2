/**
 * Section template JSON content for Craft.js
 * Each template contains a node tree structure
 */

export interface TemplateNodeTree {
  rootNodeId: string;
  nodes: Record<string, any>;
}

// Helper to generate a template-specific ID prefix
const makeId = (templateId: string, nodeId: string) => `${templateId}-${nodeId}`;

// ============ HERO TEMPLATES ============

export const heroTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: {
      type: { resolvedName: 'Section' },
      isCanvas: true,
      props: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '100px 20px',
        minHeight: '500px',
        maxWidth: '1200px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      },
      displayName: 'Section',
      custom: { displayName: 'Hero Section', componentType: 'hero', isSection: true },
      nodes: ['title', 'subtitle', 'cta'],
      linkedNodes: {},
    },
    title: {
      type: { resolvedName: 'Text' },
      isCanvas: false,
      props: { text: 'Build Beautiful Websites', fontSize: 48, fontWeight: 700, color: '#ffffff', textAlign: 'center', tagName: 'h1' },
      displayName: 'Text',
      custom: { displayName: 'Hero Title', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
    subtitle: {
      type: { resolvedName: 'Text' },
      isCanvas: false,
      props: { text: 'Create stunning, responsive websites with our intuitive drag-and-drop builder. No coding required.', fontSize: 20, fontWeight: 400, color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 1.6 },
      displayName: 'Text',
      custom: { displayName: 'Hero Subtitle', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
    cta: {
      type: { resolvedName: 'Button' },
      isCanvas: false,
      props: { text: 'Get Started Free', fontSize: 18, fontWeight: 600, color: '#667eea', background: '#ffffff', padding: '16px 40px', borderRadius: 30 },
      displayName: 'Button',
      custom: { displayName: 'CTA Button', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
  },
};

export const heroTemplate2: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: {
      type: { resolvedName: 'Section' },
      isCanvas: true,
      props: {
        background: '#ffffff',
        padding: '80px 20px',
        minHeight: '500px',
        maxWidth: '1200px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 40,
      },
      displayName: 'Section',
      custom: { displayName: 'Hero Section', componentType: 'hero', isSection: true },
      nodes: ['content', 'image'],
      linkedNodes: {},
    },
    content: {
      type: { resolvedName: 'Container' },
      isCanvas: true,
      props: { background: 'transparent', padding: 0, flexDirection: 'column', alignItems: 'flex-start', gap: 20, width: '50%' },
      displayName: 'Container',
      custom: { displayName: 'Hero Content', isSection: false },
      parent: 'section',
      nodes: ['title', 'subtitle', 'cta'],
      linkedNodes: {},
    },
    title: {
      type: { resolvedName: 'Text' },
      isCanvas: false,
      props: { text: 'Transform Your Business Today', fontSize: 42, fontWeight: 700, color: '#1e293b', textAlign: 'left', tagName: 'h1' },
      displayName: 'Text',
      custom: { displayName: 'Hero Title', isSection: false },
      parent: 'content',
      nodes: [],
      linkedNodes: {},
    },
    subtitle: {
      type: { resolvedName: 'Text' },
      isCanvas: false,
      props: { text: 'Unlock your potential with our innovative solutions designed for modern businesses.', fontSize: 18, fontWeight: 400, color: '#64748b', textAlign: 'left', lineHeight: 1.6 },
      displayName: 'Text',
      custom: { displayName: 'Hero Subtitle', isSection: false },
      parent: 'content',
      nodes: [],
      linkedNodes: {},
    },
    cta: {
      type: { resolvedName: 'Button' },
      isCanvas: false,
      props: { text: 'Learn More', fontSize: 16, fontWeight: 600, color: '#ffffff', background: '#667eea', padding: '14px 32px', borderRadius: 8 },
      displayName: 'Button',
      custom: { displayName: 'CTA Button', isSection: false },
      parent: 'content',
      nodes: [],
      linkedNodes: {},
    },
    image: {
      type: { resolvedName: 'Image' },
      isCanvas: false,
      props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&h=400&q=80', alt: 'Hero Image', width: '45%', height: 'auto', borderRadius: 12 },
      displayName: 'Image',
      custom: { displayName: 'Hero Image', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
  },
};

export const heroTemplate3: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: {
      type: { resolvedName: 'Section' },
      isCanvas: true,
      props: {
        background: '#0f172a',
        padding: '100px 20px',
        minHeight: '600px',
        maxWidth: '1200px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      },
      displayName: 'Section',
      custom: { displayName: 'Hero Section', componentType: 'hero', isSection: true },
      nodes: ['badge', 'title', 'subtitle', 'buttons'],
      linkedNodes: {},
    },
    badge: {
      type: { resolvedName: 'Text' },
      isCanvas: false,
      props: { text: '🚀 New Release', fontSize: 14, fontWeight: 500, color: '#a5b4fc', textAlign: 'center' },
      displayName: 'Text',
      custom: { displayName: 'Badge', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
    title: {
      type: { resolvedName: 'Text' },
      isCanvas: false,
      props: { text: 'The Future of Web Design', fontSize: 56, fontWeight: 800, color: '#ffffff', textAlign: 'center', tagName: 'h1' },
      displayName: 'Text',
      custom: { displayName: 'Hero Title', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
    subtitle: {
      type: { resolvedName: 'Text' },
      isCanvas: false,
      props: { text: 'Experience next-generation web building with AI-powered tools and seamless integrations.', fontSize: 20, fontWeight: 400, color: '#94a3b8', textAlign: 'center', lineHeight: 1.6 },
      displayName: 'Text',
      custom: { displayName: 'Hero Subtitle', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
    buttons: {
      type: { resolvedName: 'Container' },
      isCanvas: true,
      props: { background: 'transparent', padding: 0, flexDirection: 'row', alignItems: 'center', gap: 16 },
      displayName: 'Container',
      custom: { displayName: 'Button Group', isSection: false },
      parent: 'section',
      nodes: ['cta1', 'cta2'],
      linkedNodes: {},
    },
    cta1: {
      type: { resolvedName: 'Button' },
      isCanvas: false,
      props: { text: 'Start Building', fontSize: 16, fontWeight: 600, color: '#0f172a', background: '#ffffff', padding: '14px 28px', borderRadius: 8 },
      displayName: 'Button',
      custom: { displayName: 'Primary CTA', isSection: false },
      parent: 'buttons',
      nodes: [],
      linkedNodes: {},
    },
    cta2: {
      type: { resolvedName: 'Button' },
      isCanvas: false,
      props: { text: 'Watch Demo', fontSize: 16, fontWeight: 600, color: '#ffffff', background: 'transparent', padding: '14px 28px', borderRadius: 8 },
      displayName: 'Button',
      custom: { displayName: 'Secondary CTA', isSection: false },
      parent: 'buttons',
      nodes: [],
      linkedNodes: {},
    },
  },
};

export const heroTemplate4: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: {
      type: { resolvedName: 'Section' },
      isCanvas: true,
      props: {
        background: 'linear-gradient(180deg, #fdf4ff 0%, #ffffff 100%)',
        padding: '80px 20px',
        minHeight: '500px',
        maxWidth: '1200px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
      },
      displayName: 'Section',
      custom: { displayName: 'Hero Section', componentType: 'hero', isSection: true },
      nodes: ['title', 'subtitle', 'cta', 'image'],
      linkedNodes: {},
    },
    title: {
      type: { resolvedName: 'Text' },
      isCanvas: false,
      props: { text: 'Create Without Limits', fontSize: 52, fontWeight: 700, color: '#581c87', textAlign: 'center', tagName: 'h1' },
      displayName: 'Text',
      custom: { displayName: 'Hero Title', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
    subtitle: {
      type: { resolvedName: 'Text' },
      isCanvas: false,
      props: { text: 'Design and launch beautiful websites in minutes, not months.', fontSize: 20, fontWeight: 400, color: '#6b7280', textAlign: 'center', lineHeight: 1.6 },
      displayName: 'Text',
      custom: { displayName: 'Hero Subtitle', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
    cta: {
      type: { resolvedName: 'Button' },
      isCanvas: false,
      props: { text: 'Try It Free', fontSize: 18, fontWeight: 600, color: '#ffffff', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', padding: '16px 40px', borderRadius: 30 },
      displayName: 'Button',
      custom: { displayName: 'CTA Button', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
    image: {
      type: { resolvedName: 'Image' },
      isCanvas: false,
      props: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&h=500&q=80', alt: 'Dashboard Preview', width: '80%', height: 'auto', borderRadius: 16 },
      displayName: 'Image',
      custom: { displayName: 'Preview Image', isSection: false },
      parent: 'section',
      nodes: [],
      linkedNodes: {},
    },
  },
};

// Export template map for easy lookup
export const HERO_TEMPLATES: Record<string, TemplateNodeTree> = {
  'hero-1': heroTemplate1,
  'hero-2': heroTemplate2,
  'hero-3': heroTemplate3,
  'hero-4': heroTemplate4,
};
