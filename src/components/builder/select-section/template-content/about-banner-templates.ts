/**
 * About, Banner, Team, and Contact section templates
 */

import { TemplateNodeTree } from './hero-templates';

// ============ ABOUT TEMPLATES ============

export const aboutTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#ffffff', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'row', alignItems: 'center', gap: 40 }, displayName: 'Section', custom: { displayName: 'About Section', componentType: 'about', isSection: true }, nodes: ['image', 'content'], linkedNodes: {} },
    image: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=400&q=80', alt: 'About Us', width: '45%', height: 'auto', borderRadius: 12 }, displayName: 'Image', custom: { displayName: 'About Image', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    content: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'column', gap: 16, width: '50%' }, displayName: 'Container', custom: { displayName: 'Content', isSection: false }, parent: 'section', nodes: ['title', 'desc'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'About Our Company', fontSize: 32, fontWeight: 700, color: '#1e293b', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'content', nodes: [], linkedNodes: {} },
    desc: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'We are dedicated to providing the best service. Our team works hard to ensure customer satisfaction and deliver high-quality products.', fontSize: 16, color: '#64748b', lineHeight: 1.7 }, displayName: 'Text', custom: { displayName: 'Description', isSection: false }, parent: 'content', nodes: [], linkedNodes: {} },
  },
};

export const aboutTemplate2: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#f8fafc', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'row', alignItems: 'center', gap: 40 }, displayName: 'Section', custom: { displayName: 'About Section', componentType: 'about', isSection: true }, nodes: ['content', 'image'], linkedNodes: {} },
    content: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'column', gap: 20, width: '50%' }, displayName: 'Container', custom: { displayName: 'Content', isSection: false }, parent: 'section', nodes: ['title', 'desc', 'cta'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Our Story', fontSize: 36, fontWeight: 700, color: '#0f172a', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'content', nodes: [], linkedNodes: {} },
    desc: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Founded in 2020, we have grown from a small startup to a leading provider in our industry. Our mission is to innovate and inspire.', fontSize: 16, color: '#475569', lineHeight: 1.7 }, displayName: 'Text', custom: { displayName: 'Description', isSection: false }, parent: 'content', nodes: [], linkedNodes: {} },
    cta: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Learn More', fontSize: 14, fontWeight: 600, color: '#ffffff', background: '#3b82f6', padding: '12px 24px', borderRadius: 8 }, displayName: 'Button', custom: { displayName: 'CTA', isSection: false }, parent: 'content', nodes: [], linkedNodes: {} },
    image: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&h=450&q=80', alt: 'Our Team', width: '45%', height: 'auto', borderRadius: 12 }, displayName: 'Image', custom: { displayName: 'About Image', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const aboutTemplate3: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#ffffff', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 40 }, displayName: 'Section', custom: { displayName: 'About Section', componentType: 'about', isSection: true }, nodes: ['header', 'stats'], linkedNodes: {} },
    header: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'column', alignItems: 'center', gap: 12 }, displayName: 'Container', custom: { displayName: 'Header', isSection: false }, parent: 'section', nodes: ['title', 'desc'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'We Deliver Results', fontSize: 36, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'header', nodes: [], linkedNodes: {} },
    desc: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Our track record speaks for itself', fontSize: 18, color: '#64748b', textAlign: 'center' }, displayName: 'Text', custom: { displayName: 'Subtitle', isSection: false }, parent: 'header', nodes: [], linkedNodes: {} },
    stats: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 60, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Stats', isSection: false }, parent: 'section', nodes: ['s1', 's2', 's3'], linkedNodes: {} },
    s1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'column', alignItems: 'center', gap: 4 }, displayName: 'Container', custom: { displayName: 'Stat', isSection: false }, parent: 'stats', nodes: ['n1', 'l1'], linkedNodes: {} },
    n1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '500+', fontSize: 42, fontWeight: 700, color: '#3b82f6' }, displayName: 'Text', custom: { displayName: 'Number', isSection: false }, parent: 's1', nodes: [], linkedNodes: {} },
    l1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Clients', fontSize: 16, color: '#64748b' }, displayName: 'Text', custom: { displayName: 'Label', isSection: false }, parent: 's1', nodes: [], linkedNodes: {} },
    s2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'column', alignItems: 'center', gap: 4 }, displayName: 'Container', custom: { displayName: 'Stat', isSection: false }, parent: 'stats', nodes: ['n2', 'l2'], linkedNodes: {} },
    n2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '1000+', fontSize: 42, fontWeight: 700, color: '#3b82f6' }, displayName: 'Text', custom: { displayName: 'Number', isSection: false }, parent: 's2', nodes: [], linkedNodes: {} },
    l2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Projects', fontSize: 16, color: '#64748b' }, displayName: 'Text', custom: { displayName: 'Label', isSection: false }, parent: 's2', nodes: [], linkedNodes: {} },
    s3: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'column', alignItems: 'center', gap: 4 }, displayName: 'Container', custom: { displayName: 'Stat', isSection: false }, parent: 'stats', nodes: ['n3', 'l3'], linkedNodes: {} },
    n3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '99%', fontSize: 42, fontWeight: 700, color: '#3b82f6' }, displayName: 'Text', custom: { displayName: 'Number', isSection: false }, parent: 's3', nodes: [], linkedNodes: {} },
    l3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Satisfaction', fontSize: 16, color: '#64748b' }, displayName: 'Text', custom: { displayName: 'Label', isSection: false }, parent: 's3', nodes: [], linkedNodes: {} },
  },
};

export const aboutTemplate4: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#f1f5f9', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 32 }, displayName: 'Section', custom: { displayName: 'About Section', componentType: 'about', isSection: true }, nodes: ['title', 'timeline'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Our Journey', fontSize: 36, fontWeight: 700, color: '#0f172a', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    timeline: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 32, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Timeline', isSection: false }, parent: 'section', nodes: ['t1', 't2', 't3'], linkedNodes: {} },
    t1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 24, flexDirection: 'column', gap: 8, width: '280px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Event', isSection: false }, parent: 'timeline', nodes: ['y1', 'e1'], linkedNodes: {} },
    y1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '2020', fontSize: 28, fontWeight: 700, color: '#6366f1' }, displayName: 'Text', custom: { displayName: 'Year', isSection: false }, parent: 't1', nodes: [], linkedNodes: {} },
    e1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Company founded with a vision to transform the industry.', fontSize: 14, color: '#64748b', lineHeight: 1.6 }, displayName: 'Text', custom: { displayName: 'Event', isSection: false }, parent: 't1', nodes: [], linkedNodes: {} },
    t2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 24, flexDirection: 'column', gap: 8, width: '280px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Event', isSection: false }, parent: 'timeline', nodes: ['y2', 'e2'], linkedNodes: {} },
    y2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '2022', fontSize: 28, fontWeight: 700, color: '#6366f1' }, displayName: 'Text', custom: { displayName: 'Year', isSection: false }, parent: 't2', nodes: [], linkedNodes: {} },
    e2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Reached 100 customers and expanded globally.', fontSize: 14, color: '#64748b', lineHeight: 1.6 }, displayName: 'Text', custom: { displayName: 'Event', isSection: false }, parent: 't2', nodes: [], linkedNodes: {} },
    t3: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 24, flexDirection: 'column', gap: 8, width: '280px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Event', isSection: false }, parent: 'timeline', nodes: ['y3', 'e3'], linkedNodes: {} },
    y3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '2024', fontSize: 28, fontWeight: 700, color: '#6366f1' }, displayName: 'Text', custom: { displayName: 'Year', isSection: false }, parent: 't3', nodes: [], linkedNodes: {} },
    e3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Launched v2.0 with AI-powered features.', fontSize: 14, color: '#64748b', lineHeight: 1.6 }, displayName: 'Text', custom: { displayName: 'Event', isSection: false }, parent: 't3', nodes: [], linkedNodes: {} },
  },
};

// ============ BANNER TEMPLATES ============

export const bannerTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '50px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 16 }, displayName: 'Section', custom: { displayName: 'Banner', componentType: 'banner', isSection: true }, nodes: ['text', 'subtext'], linkedNodes: {} },
    text: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Special Offer: Get 50% Off Today!', fontSize: 28, fontWeight: 700, color: '#ffffff', textAlign: 'center' }, displayName: 'Text', custom: { displayName: 'Banner Text', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    subtext: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Limited time only. Don\'t miss out.', fontSize: 16, color: 'rgba(255,255,255,0.9)', textAlign: 'center' }, displayName: 'Text', custom: { displayName: 'Subtext', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const bannerTemplate2: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#0f172a', padding: '40px 20px', maxWidth: '1200px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24 }, displayName: 'Section', custom: { displayName: 'Banner', componentType: 'banner', isSection: true }, nodes: ['text', 'cta'], linkedNodes: {} },
    text: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Ready to get started? Join thousands of happy customers.', fontSize: 20, fontWeight: 500, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Text', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    cta: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Get Started', fontSize: 14, fontWeight: 600, color: '#0f172a', background: '#ffffff', padding: '12px 24px', borderRadius: 8 }, displayName: 'Button', custom: { displayName: 'CTA', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const bannerTemplate3: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#fef3c7', padding: '20px', maxWidth: '1200px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 }, displayName: 'Section', custom: { displayName: 'Banner', componentType: 'banner', isSection: true }, nodes: ['icon', 'text'], linkedNodes: {} },
    icon: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '📢', fontSize: 20 }, displayName: 'Text', custom: { displayName: 'Icon', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    text: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Announcement: We\'ve launched our new product! Check it out now.', fontSize: 15, fontWeight: 500, color: '#78350f' }, displayName: 'Text', custom: { displayName: 'Text', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const bannerTemplate4: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: 'linear-gradient(90deg, #dc2626 0%, #ea580c 100%)', padding: '48px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 20 }, displayName: 'Section', custom: { displayName: 'Banner', componentType: 'banner', isSection: true }, nodes: ['badge', 'text', 'cta'], linkedNodes: {} },
    badge: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '🔥 FLASH SALE', fontSize: 14, fontWeight: 700, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Badge', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    text: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Up to 70% off on all items. Sale ends in 24 hours!', fontSize: 24, fontWeight: 600, color: '#ffffff', textAlign: 'center' }, displayName: 'Text', custom: { displayName: 'Text', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    cta: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Shop Now', fontSize: 16, fontWeight: 700, color: '#dc2626', background: '#ffffff', padding: '14px 32px', borderRadius: 8 }, displayName: 'Button', custom: { displayName: 'CTA', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const ABOUT_TEMPLATES: Record<string, TemplateNodeTree> = { 'about-1': aboutTemplate1, 'about-2': aboutTemplate2, 'about-3': aboutTemplate3, 'about-4': aboutTemplate4 };
export const BANNER_TEMPLATES: Record<string, TemplateNodeTree> = { 'banner-1': bannerTemplate1, 'banner-2': bannerTemplate2, 'banner-3': bannerTemplate3, 'banner-4': bannerTemplate4 };
