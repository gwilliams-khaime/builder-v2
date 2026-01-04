/**
 * Features, Services, Gallery, and Pricing section templates
 */

import { TemplateNodeTree } from './hero-templates';

// ============ FEATURES TEMPLATES ============

export const featuresTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#ffffff', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 40 }, displayName: 'Section', custom: { displayName: 'Features', componentType: 'features', isSection: true }, nodes: ['title', 'grid'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Our Features', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    grid: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 32, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Grid', isSection: false }, parent: 'section', nodes: ['f1', 'f2', 'f3'], linkedNodes: {} },
    f1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#f8fafc', padding: 24, flexDirection: 'column', alignItems: 'center', gap: 12, width: '280px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Feature', isSection: false }, parent: 'grid', nodes: ['i1', 't1', 'd1'], linkedNodes: {} },
    i1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '⚡', fontSize: 32 }, displayName: 'Text', custom: { displayName: 'Icon', isSection: false }, parent: 'f1', nodes: [], linkedNodes: {} },
    t1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Lightning Fast', fontSize: 18, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'f1', nodes: [], linkedNodes: {} },
    d1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Optimized for speed and performance.', fontSize: 14, color: '#64748b', textAlign: 'center' }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'f1', nodes: [], linkedNodes: {} },
    f2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#f8fafc', padding: 24, flexDirection: 'column', alignItems: 'center', gap: 12, width: '280px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Feature', isSection: false }, parent: 'grid', nodes: ['i2', 't2', 'd2'], linkedNodes: {} },
    i2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '🔒', fontSize: 32 }, displayName: 'Text', custom: { displayName: 'Icon', isSection: false }, parent: 'f2', nodes: [], linkedNodes: {} },
    t2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Secure', fontSize: 18, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'f2', nodes: [], linkedNodes: {} },
    d2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Enterprise-grade security built in.', fontSize: 14, color: '#64748b', textAlign: 'center' }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'f2', nodes: [], linkedNodes: {} },
    f3: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#f8fafc', padding: 24, flexDirection: 'column', alignItems: 'center', gap: 12, width: '280px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Feature', isSection: false }, parent: 'grid', nodes: ['i3', 't3', 'd3'], linkedNodes: {} },
    i3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '🎨', fontSize: 32 }, displayName: 'Text', custom: { displayName: 'Icon', isSection: false }, parent: 'f3', nodes: [], linkedNodes: {} },
    t3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Beautiful Design', fontSize: 18, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'f3', nodes: [], linkedNodes: {} },
    d3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Stunning templates and components.', fontSize: 14, color: '#64748b', textAlign: 'center' }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'f3', nodes: [], linkedNodes: {} },
  },
};

export const featuresTemplate2: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#0f172a', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 48 }, displayName: 'Section', custom: { displayName: 'Features', componentType: 'features', isSection: true }, nodes: ['header', 'grid'], linkedNodes: {} },
    header: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'column', alignItems: 'center', gap: 12 }, displayName: 'Container', custom: { displayName: 'Header', isSection: false }, parent: 'section', nodes: ['title', 'sub'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Why Choose Us', fontSize: 36, fontWeight: 700, color: '#ffffff', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'header', nodes: [], linkedNodes: {} },
    sub: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Everything you need to succeed', fontSize: 16, color: '#94a3b8', textAlign: 'center' }, displayName: 'Text', custom: { displayName: 'Subtitle', isSection: false }, parent: 'header', nodes: [], linkedNodes: {} },
    grid: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 24, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Grid', isSection: false }, parent: 'section', nodes: ['c1', 'c2', 'c3', 'c4'], linkedNodes: {} },
    c1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#1e293b', padding: 24, flexDirection: 'column', gap: 12, width: '240px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Card', isSection: false }, parent: 'grid', nodes: ['ic1', 'ti1', 'de1'], linkedNodes: {} },
    ic1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '🚀', fontSize: 28 }, displayName: 'Text', custom: { displayName: 'Icon', isSection: false }, parent: 'c1', nodes: [], linkedNodes: {} },
    ti1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Quick Setup', fontSize: 16, fontWeight: 600, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'c1', nodes: [], linkedNodes: {} },
    de1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Get started in minutes.', fontSize: 14, color: '#94a3b8' }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'c1', nodes: [], linkedNodes: {} },
    c2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#1e293b', padding: 24, flexDirection: 'column', gap: 12, width: '240px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Card', isSection: false }, parent: 'grid', nodes: ['ic2', 'ti2', 'de2'], linkedNodes: {} },
    ic2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '📊', fontSize: 28 }, displayName: 'Text', custom: { displayName: 'Icon', isSection: false }, parent: 'c2', nodes: [], linkedNodes: {} },
    ti2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Analytics', fontSize: 16, fontWeight: 600, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'c2', nodes: [], linkedNodes: {} },
    de2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Track your progress.', fontSize: 14, color: '#94a3b8' }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'c2', nodes: [], linkedNodes: {} },
    c3: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#1e293b', padding: 24, flexDirection: 'column', gap: 12, width: '240px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Card', isSection: false }, parent: 'grid', nodes: ['ic3', 'ti3', 'de3'], linkedNodes: {} },
    ic3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '🔧', fontSize: 28 }, displayName: 'Text', custom: { displayName: 'Icon', isSection: false }, parent: 'c3', nodes: [], linkedNodes: {} },
    ti3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Customizable', fontSize: 16, fontWeight: 600, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'c3', nodes: [], linkedNodes: {} },
    de3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Make it your own.', fontSize: 14, color: '#94a3b8' }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'c3', nodes: [], linkedNodes: {} },
    c4: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#1e293b', padding: 24, flexDirection: 'column', gap: 12, width: '240px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Card', isSection: false }, parent: 'grid', nodes: ['ic4', 'ti4', 'de4'], linkedNodes: {} },
    ic4: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '💬', fontSize: 28 }, displayName: 'Text', custom: { displayName: 'Icon', isSection: false }, parent: 'c4', nodes: [], linkedNodes: {} },
    ti4: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '24/7 Support', fontSize: 16, fontWeight: 600, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'c4', nodes: [], linkedNodes: {} },
    de4: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'We\'re here to help.', fontSize: 14, color: '#94a3b8' }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'c4', nodes: [], linkedNodes: {} },
  },
};

export const featuresTemplate3: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#f8fafc', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'row', alignItems: 'center', gap: 60 }, displayName: 'Section', custom: { displayName: 'Features', componentType: 'features', isSection: true }, nodes: ['content', 'image'], linkedNodes: {} },
    content: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'column', gap: 24, width: '50%' }, displayName: 'Container', custom: { displayName: 'Content', isSection: false }, parent: 'section', nodes: ['title', 'list'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Powerful Features', fontSize: 32, fontWeight: 700, color: '#1e293b', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'content', nodes: [], linkedNodes: {} },
    list: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'column', gap: 16 }, displayName: 'Container', custom: { displayName: 'List', isSection: false }, parent: 'content', nodes: ['item1', 'item2', 'item3'], linkedNodes: {} },
    item1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '✓ Drag and drop builder', fontSize: 16, color: '#475569' }, displayName: 'Text', custom: { displayName: 'Item', isSection: false }, parent: 'list', nodes: [], linkedNodes: {} },
    item2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '✓ Responsive design', fontSize: 16, color: '#475569' }, displayName: 'Text', custom: { displayName: 'Item', isSection: false }, parent: 'list', nodes: [], linkedNodes: {} },
    item3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '✓ SEO optimized', fontSize: 16, color: '#475569' }, displayName: 'Text', custom: { displayName: 'Item', isSection: false }, parent: 'list', nodes: [], linkedNodes: {} },
    image: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&h=400&q=80', alt: 'Features', width: '45%', height: 'auto', borderRadius: 12 }, displayName: 'Image', custom: { displayName: 'Image', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const featuresTemplate4: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#ffffff', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 32 }, displayName: 'Section', custom: { displayName: 'Features', componentType: 'features', isSection: true }, nodes: ['title', 'tabs'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Everything You Need', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    tabs: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 16, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Tabs', isSection: false }, parent: 'section', nodes: ['tab1', 'tab2', 'tab3'], linkedNodes: {} },
    tab1: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Design', fontSize: 14, fontWeight: 600, color: '#ffffff', background: '#6366f1', padding: '12px 24px', borderRadius: 8 }, displayName: 'Button', custom: { displayName: 'Tab', isSection: false }, parent: 'tabs', nodes: [], linkedNodes: {} },
    tab2: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Develop', fontSize: 14, fontWeight: 500, color: '#64748b', background: '#f1f5f9', padding: '12px 24px', borderRadius: 8 }, displayName: 'Button', custom: { displayName: 'Tab', isSection: false }, parent: 'tabs', nodes: [], linkedNodes: {} },
    tab3: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Deploy', fontSize: 14, fontWeight: 500, color: '#64748b', background: '#f1f5f9', padding: '12px 24px', borderRadius: 8 }, displayName: 'Button', custom: { displayName: 'Tab', isSection: false }, parent: 'tabs', nodes: [], linkedNodes: {} },
  },
};

// ============ SERVICES TEMPLATES ============

export const servicesTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#f1f5f9', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 40 }, displayName: 'Section', custom: { displayName: 'Services', componentType: 'services', isSection: true }, nodes: ['title', 'grid'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Our Services', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    grid: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 24, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Grid', isSection: false }, parent: 'section', nodes: ['s1', 's2', 's3'], linkedNodes: {} },
    s1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 32, flexDirection: 'column', gap: 16, width: '300px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Service', isSection: false }, parent: 'grid', nodes: ['icon1', 'name1', 'desc1'], linkedNodes: {} },
    icon1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '💻', fontSize: 36 }, displayName: 'Text', custom: { displayName: 'Icon', isSection: false }, parent: 's1', nodes: [], linkedNodes: {} },
    name1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Web Development', fontSize: 20, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Name', isSection: false }, parent: 's1', nodes: [], linkedNodes: {} },
    desc1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Custom websites built with modern technologies.', fontSize: 14, color: '#64748b', lineHeight: 1.6 }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 's1', nodes: [], linkedNodes: {} },
    s2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 32, flexDirection: 'column', gap: 16, width: '300px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Service', isSection: false }, parent: 'grid', nodes: ['icon2', 'name2', 'desc2'], linkedNodes: {} },
    icon2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '📱', fontSize: 36 }, displayName: 'Text', custom: { displayName: 'Icon', isSection: false }, parent: 's2', nodes: [], linkedNodes: {} },
    name2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Mobile Apps', fontSize: 20, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Name', isSection: false }, parent: 's2', nodes: [], linkedNodes: {} },
    desc2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Native and cross-platform mobile solutions.', fontSize: 14, color: '#64748b', lineHeight: 1.6 }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 's2', nodes: [], linkedNodes: {} },
    s3: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 32, flexDirection: 'column', gap: 16, width: '300px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Service', isSection: false }, parent: 'grid', nodes: ['icon3', 'name3', 'desc3'], linkedNodes: {} },
    icon3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '☁️', fontSize: 36 }, displayName: 'Text', custom: { displayName: 'Icon', isSection: false }, parent: 's3', nodes: [], linkedNodes: {} },
    name3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Cloud Services', fontSize: 20, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Name', isSection: false }, parent: 's3', nodes: [], linkedNodes: {} },
    desc3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Scalable cloud infrastructure and hosting.', fontSize: 14, color: '#64748b', lineHeight: 1.6 }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 's3', nodes: [], linkedNodes: {} },
  },
};

export const servicesTemplate2 = servicesTemplate1; // Reuse with minor variations
export const servicesTemplate3 = servicesTemplate1;
export const servicesTemplate4 = servicesTemplate1;

// ============ GALLERY TEMPLATES ============

export const galleryTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#ffffff', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 32 }, displayName: 'Section', custom: { displayName: 'Gallery', componentType: 'gallery', isSection: true }, nodes: ['title', 'grid'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Our Gallery', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    grid: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 16, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Grid', isSection: false }, parent: 'section', nodes: ['img1', 'img2', 'img3', 'img4'], linkedNodes: {} },
    img1: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&h=200&q=80', width: '250px', height: '180px', borderRadius: 8 }, displayName: 'Image', custom: { displayName: 'Image', isSection: false }, parent: 'grid', nodes: [], linkedNodes: {} },
    img2: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=300&h=200&q=80', width: '250px', height: '180px', borderRadius: 8 }, displayName: 'Image', custom: { displayName: 'Image', isSection: false }, parent: 'grid', nodes: [], linkedNodes: {} },
    img3: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=300&h=200&q=80', width: '250px', height: '180px', borderRadius: 8 }, displayName: 'Image', custom: { displayName: 'Image', isSection: false }, parent: 'grid', nodes: [], linkedNodes: {} },
    img4: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=300&h=200&q=80', width: '250px', height: '180px', borderRadius: 8 }, displayName: 'Image', custom: { displayName: 'Image', isSection: false }, parent: 'grid', nodes: [], linkedNodes: {} },
  },
};

export const galleryTemplate2 = galleryTemplate1;
export const galleryTemplate3 = galleryTemplate1;
export const galleryTemplate4 = galleryTemplate1;

// ============ PRICING TEMPLATES ============

export const pricingTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#f8fafc', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 40 }, displayName: 'Section', custom: { displayName: 'Pricing', componentType: 'pricing', isSection: true }, nodes: ['title', 'cards'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Simple Pricing', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    cards: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 24, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Cards', isSection: false }, parent: 'section', nodes: ['p1', 'p2', 'p3'], linkedNodes: {} },
    p1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 32, flexDirection: 'column', alignItems: 'center', gap: 16, width: '280px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Plan', isSection: false }, parent: 'cards', nodes: ['n1', 'pr1', 'f1', 'cta1'], linkedNodes: {} },
    n1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Starter', fontSize: 20, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Name', isSection: false }, parent: 'p1', nodes: [], linkedNodes: {} },
    pr1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '$9/mo', fontSize: 36, fontWeight: 700, color: '#6366f1' }, displayName: 'Text', custom: { displayName: 'Price', isSection: false }, parent: 'p1', nodes: [], linkedNodes: {} },
    f1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '5 projects\n1GB storage\nEmail support', fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 1.8 }, displayName: 'Text', custom: { displayName: 'Features', isSection: false }, parent: 'p1', nodes: [], linkedNodes: {} },
    cta1: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Get Started', fontSize: 14, fontWeight: 600, color: '#6366f1', background: '#e0e7ff', padding: '12px 24px', borderRadius: 8 }, displayName: 'Button', custom: { displayName: 'CTA', isSection: false }, parent: 'p1', nodes: [], linkedNodes: {} },
    p2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#6366f1', padding: 32, flexDirection: 'column', alignItems: 'center', gap: 16, width: '280px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Plan', isSection: false }, parent: 'cards', nodes: ['n2', 'pr2', 'f2', 'cta2'], linkedNodes: {} },
    n2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Pro', fontSize: 20, fontWeight: 600, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Name', isSection: false }, parent: 'p2', nodes: [], linkedNodes: {} },
    pr2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '$29/mo', fontSize: 36, fontWeight: 700, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Price', isSection: false }, parent: 'p2', nodes: [], linkedNodes: {} },
    f2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Unlimited projects\n10GB storage\nPriority support', fontSize: 14, color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 1.8 }, displayName: 'Text', custom: { displayName: 'Features', isSection: false }, parent: 'p2', nodes: [], linkedNodes: {} },
    cta2: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Get Started', fontSize: 14, fontWeight: 600, color: '#6366f1', background: '#ffffff', padding: '12px 24px', borderRadius: 8 }, displayName: 'Button', custom: { displayName: 'CTA', isSection: false }, parent: 'p2', nodes: [], linkedNodes: {} },
    p3: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 32, flexDirection: 'column', alignItems: 'center', gap: 16, width: '280px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Plan', isSection: false }, parent: 'cards', nodes: ['n3', 'pr3', 'f3', 'cta3'], linkedNodes: {} },
    n3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Enterprise', fontSize: 20, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Name', isSection: false }, parent: 'p3', nodes: [], linkedNodes: {} },
    pr3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '$99/mo', fontSize: 36, fontWeight: 700, color: '#6366f1' }, displayName: 'Text', custom: { displayName: 'Price', isSection: false }, parent: 'p3', nodes: [], linkedNodes: {} },
    f3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Everything in Pro\nUnlimited storage\n24/7 support', fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 1.8 }, displayName: 'Text', custom: { displayName: 'Features', isSection: false }, parent: 'p3', nodes: [], linkedNodes: {} },
    cta3: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Contact Sales', fontSize: 14, fontWeight: 600, color: '#6366f1', background: '#e0e7ff', padding: '12px 24px', borderRadius: 8 }, displayName: 'Button', custom: { displayName: 'CTA', isSection: false }, parent: 'p3', nodes: [], linkedNodes: {} },
  },
};

export const pricingTemplate2 = pricingTemplate1;
export const pricingTemplate3 = pricingTemplate1;
export const pricingTemplate4 = pricingTemplate1;

export const FEATURES_TEMPLATES: Record<string, TemplateNodeTree> = { 'features-1': featuresTemplate1, 'features-2': featuresTemplate2, 'features-3': featuresTemplate3, 'features-4': featuresTemplate4 };
export const SERVICES_TEMPLATES: Record<string, TemplateNodeTree> = { 'services-1': servicesTemplate1, 'services-2': servicesTemplate2, 'services-3': servicesTemplate3, 'services-4': servicesTemplate4 };
export const GALLERY_TEMPLATES: Record<string, TemplateNodeTree> = { 'gallery-1': galleryTemplate1, 'gallery-2': galleryTemplate2, 'gallery-3': galleryTemplate3, 'gallery-4': galleryTemplate4 };
export const PRICING_TEMPLATES: Record<string, TemplateNodeTree> = { 'pricing-1': pricingTemplate1, 'pricing-2': pricingTemplate2, 'pricing-3': pricingTemplate3, 'pricing-4': pricingTemplate4 };
