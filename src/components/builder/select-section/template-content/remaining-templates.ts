/**
 * Remaining section templates (Contact, FAQ, Testimonials, Newsletter, etc.)
 */

import { TemplateNodeTree } from './hero-templates';

// ============ CONTACT TEMPLATES ============

export const contactTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#ffffff', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'row', alignItems: 'flex-start', gap: 60 }, displayName: 'Section', custom: { displayName: 'Contact', componentType: 'contact', isSection: true }, nodes: ['info', 'form'], linkedNodes: {} },
    info: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'column', gap: 24, width: '40%' }, displayName: 'Container', custom: { displayName: 'Info', isSection: false }, parent: 'section', nodes: ['title', 'desc', 'email', 'phone'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Get in Touch', fontSize: 32, fontWeight: 700, color: '#1e293b', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'info', nodes: [], linkedNodes: {} },
    desc: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Have a question? We\'d love to hear from you.', fontSize: 16, color: '#64748b', lineHeight: 1.6 }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'info', nodes: [], linkedNodes: {} },
    email: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '📧 hello@company.com', fontSize: 15, color: '#475569' }, displayName: 'Text', custom: { displayName: 'Email', isSection: false }, parent: 'info', nodes: [], linkedNodes: {} },
    phone: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '📞 +1 (555) 123-4567', fontSize: 15, color: '#475569' }, displayName: 'Text', custom: { displayName: 'Phone', isSection: false }, parent: 'info', nodes: [], linkedNodes: {} },
    form: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#f8fafc', padding: 32, flexDirection: 'column', gap: 16, width: '50%', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Form', isSection: false }, parent: 'section', nodes: ['formTitle', 'cta'], linkedNodes: {} },
    formTitle: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Send us a message', fontSize: 20, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Form Title', isSection: false }, parent: 'form', nodes: [], linkedNodes: {} },
    cta: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Send Message', fontSize: 14, fontWeight: 600, color: '#ffffff', background: '#6366f1', padding: '14px 28px', borderRadius: 8 }, displayName: 'Button', custom: { displayName: 'Submit', isSection: false }, parent: 'form', nodes: [], linkedNodes: {} },
  },
};

export const contactTemplate2 = contactTemplate1;
export const contactTemplate3 = contactTemplate1;
export const contactTemplate4 = contactTemplate1;

// ============ FAQ TEMPLATES ============

export const faqTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#f8fafc', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 40 }, displayName: 'Section', custom: { displayName: 'FAQ', componentType: 'faq', isSection: true }, nodes: ['title', 'faqs'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Frequently Asked Questions', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    faqs: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'column', gap: 16, width: '100%', maxWidth: '800px' }, displayName: 'Container', custom: { displayName: 'FAQs', isSection: false }, parent: 'section', nodes: ['q1', 'q2', 'q3'], linkedNodes: {} },
    q1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 24, flexDirection: 'column', gap: 8, borderRadius: 8 }, displayName: 'Container', custom: { displayName: 'FAQ', isSection: false }, parent: 'faqs', nodes: ['qt1', 'qa1'], linkedNodes: {} },
    qt1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'How do I get started?', fontSize: 16, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Question', isSection: false }, parent: 'q1', nodes: [], linkedNodes: {} },
    qa1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Simply sign up for a free account and you can start building immediately.', fontSize: 14, color: '#64748b', lineHeight: 1.6 }, displayName: 'Text', custom: { displayName: 'Answer', isSection: false }, parent: 'q1', nodes: [], linkedNodes: {} },
    q2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 24, flexDirection: 'column', gap: 8, borderRadius: 8 }, displayName: 'Container', custom: { displayName: 'FAQ', isSection: false }, parent: 'faqs', nodes: ['qt2', 'qa2'], linkedNodes: {} },
    qt2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Is there a free plan?', fontSize: 16, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Question', isSection: false }, parent: 'q2', nodes: [], linkedNodes: {} },
    qa2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Yes! We offer a generous free tier perfect for personal projects.', fontSize: 14, color: '#64748b', lineHeight: 1.6 }, displayName: 'Text', custom: { displayName: 'Answer', isSection: false }, parent: 'q2', nodes: [], linkedNodes: {} },
    q3: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 24, flexDirection: 'column', gap: 8, borderRadius: 8 }, displayName: 'Container', custom: { displayName: 'FAQ', isSection: false }, parent: 'faqs', nodes: ['qt3', 'qa3'], linkedNodes: {} },
    qt3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Can I cancel anytime?', fontSize: 16, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Question', isSection: false }, parent: 'q3', nodes: [], linkedNodes: {} },
    qa3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Absolutely. No contracts, cancel anytime with no questions asked.', fontSize: 14, color: '#64748b', lineHeight: 1.6 }, displayName: 'Text', custom: { displayName: 'Answer', isSection: false }, parent: 'q3', nodes: [], linkedNodes: {} },
  },
};

export const faqTemplate2 = faqTemplate1;
export const faqTemplate3 = faqTemplate1;
export const faqTemplate4 = faqTemplate1;

// ============ TESTIMONIALS TEMPLATES ============

export const testimonialsTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#ffffff', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 40 }, displayName: 'Section', custom: { displayName: 'Testimonials', componentType: 'testimonials', isSection: true }, nodes: ['title', 'cards'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'What Our Customers Say', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    cards: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 24, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Cards', isSection: false }, parent: 'section', nodes: ['t1', 't2'], linkedNodes: {} },
    t1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#f8fafc', padding: 32, flexDirection: 'column', gap: 16, width: '350px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Testimonial', isSection: false }, parent: 'cards', nodes: ['quote1', 'author1'], linkedNodes: {} },
    quote1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '"This product has completely transformed how we work. Highly recommended!"', fontSize: 16, color: '#475569', lineHeight: 1.6, fontStyle: 'italic' }, displayName: 'Text', custom: { displayName: 'Quote', isSection: false }, parent: 't1', nodes: [], linkedNodes: {} },
    author1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '— Sarah Johnson, CEO', fontSize: 14, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Author', isSection: false }, parent: 't1', nodes: [], linkedNodes: {} },
    t2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#f8fafc', padding: 32, flexDirection: 'column', gap: 16, width: '350px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Testimonial', isSection: false }, parent: 'cards', nodes: ['quote2', 'author2'], linkedNodes: {} },
    quote2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '"Amazing support team and incredible features. Best decision we ever made."', fontSize: 16, color: '#475569', lineHeight: 1.6, fontStyle: 'italic' }, displayName: 'Text', custom: { displayName: 'Quote', isSection: false }, parent: 't2', nodes: [], linkedNodes: {} },
    author2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '— Mike Chen, CTO', fontSize: 14, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Author', isSection: false }, parent: 't2', nodes: [], linkedNodes: {} },
  },
};

export const testimonialsTemplate2 = testimonialsTemplate1;
export const testimonialsTemplate3 = testimonialsTemplate1;
export const testimonialsTemplate4 = testimonialsTemplate1;

// ============ NEWSLETTER TEMPLATES ============

export const newsletterTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#f8fafc', padding: '60px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 24 }, displayName: 'Section', custom: { displayName: 'Newsletter', componentType: 'newsletter', isSection: true }, nodes: ['title', 'desc', 'cta'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Stay Updated', fontSize: 28, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    desc: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Subscribe to our newsletter for the latest updates.', fontSize: 16, color: '#64748b', textAlign: 'center' }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    cta: { type: { resolvedName: 'Button' }, isCanvas: false, props: { text: 'Subscribe', fontSize: 14, fontWeight: 600, color: '#ffffff', background: '#6366f1', padding: '14px 32px', borderRadius: 8 }, displayName: 'Button', custom: { displayName: 'CTA', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const newsletterTemplate2 = newsletterTemplate1;
export const newsletterTemplate3 = newsletterTemplate1;
export const newsletterTemplate4 = newsletterTemplate1;

// ============ OTHER SECTION TEMPLATES (simplified) ============

export const socialsTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#1e293b', padding: '40px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 16 }, displayName: 'Section', custom: { displayName: 'Socials', componentType: 'socials', isSection: true }, nodes: ['title', 'icons'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Follow Us', fontSize: 24, fontWeight: 600, color: '#ffffff' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    icons: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Twitter  •  LinkedIn  •  Instagram  •  Facebook', fontSize: 14, color: '#94a3b8' }, displayName: 'Text', custom: { displayName: 'Links', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const blogsTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#ffffff', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 40 }, displayName: 'Section', custom: { displayName: 'Blog', componentType: 'blogs', isSection: true }, nodes: ['title', 'grid'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Latest Articles', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    grid: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 24, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Grid', isSection: false }, parent: 'section', nodes: ['post1', 'post2'], linkedNodes: {} },
    post1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#f8fafc', padding: 0, flexDirection: 'column', width: '300px', borderRadius: 12, overflow: 'hidden' }, displayName: 'Container', custom: { displayName: 'Post', isSection: false }, parent: 'grid', nodes: ['img1', 'content1'], linkedNodes: {} },
    img1: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=300&h=180&q=80', width: '100%', height: '180px' }, displayName: 'Image', custom: { displayName: 'Image', isSection: false }, parent: 'post1', nodes: [], linkedNodes: {} },
    content1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 20, flexDirection: 'column', gap: 8 }, displayName: 'Container', custom: { displayName: 'Content', isSection: false }, parent: 'post1', nodes: ['ptitle1', 'pexcerpt1'], linkedNodes: {} },
    ptitle1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Getting Started Guide', fontSize: 18, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'content1', nodes: [], linkedNodes: {} },
    pexcerpt1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Learn how to set up your first project...', fontSize: 14, color: '#64748b' }, displayName: 'Text', custom: { displayName: 'Excerpt', isSection: false }, parent: 'content1', nodes: [], linkedNodes: {} },
    post2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#f8fafc', padding: 0, flexDirection: 'column', width: '300px', borderRadius: 12, overflow: 'hidden' }, displayName: 'Container', custom: { displayName: 'Post', isSection: false }, parent: 'grid', nodes: ['img2', 'content2'], linkedNodes: {} },
    img2: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&h=180&q=80', width: '100%', height: '180px' }, displayName: 'Image', custom: { displayName: 'Image', isSection: false }, parent: 'post2', nodes: [], linkedNodes: {} },
    content2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 20, flexDirection: 'column', gap: 8 }, displayName: 'Container', custom: { displayName: 'Content', isSection: false }, parent: 'post2', nodes: ['ptitle2', 'pexcerpt2'], linkedNodes: {} },
    ptitle2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Best Practices for 2024', fontSize: 18, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'content2', nodes: [], linkedNodes: {} },
    pexcerpt2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Discover the top trends and best practices...', fontSize: 14, color: '#64748b' }, displayName: 'Text', custom: { displayName: 'Excerpt', isSection: false }, parent: 'content2', nodes: [], linkedNodes: {} },
  },
};

export const productTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#f8fafc', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 40 }, displayName: 'Section', custom: { displayName: 'Products', componentType: 'product', isSection: true }, nodes: ['title', 'grid'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Our Products', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    grid: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 24, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Grid', isSection: false }, parent: 'section', nodes: ['prod1', 'prod2', 'prod3'], linkedNodes: {} },
    prod1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 16, flexDirection: 'column', gap: 12, width: '250px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Product', isSection: false }, parent: 'grid', nodes: ['pimg1', 'pname1', 'pprice1'], linkedNodes: {} },
    pimg1: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=220&h=220&q=80', width: '100%', height: '200px', borderRadius: 8 }, displayName: 'Image', custom: { displayName: 'Image', isSection: false }, parent: 'prod1', nodes: [], linkedNodes: {} },
    pname1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Premium Watch', fontSize: 16, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Name', isSection: false }, parent: 'prod1', nodes: [], linkedNodes: {} },
    pprice1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '$299', fontSize: 18, fontWeight: 700, color: '#6366f1' }, displayName: 'Text', custom: { displayName: 'Price', isSection: false }, parent: 'prod1', nodes: [], linkedNodes: {} },
    prod2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 16, flexDirection: 'column', gap: 12, width: '250px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Product', isSection: false }, parent: 'grid', nodes: ['pimg2', 'pname2', 'pprice2'], linkedNodes: {} },
    pimg2: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=220&h=220&q=80', width: '100%', height: '200px', borderRadius: 8 }, displayName: 'Image', custom: { displayName: 'Image', isSection: false }, parent: 'prod2', nodes: [], linkedNodes: {} },
    pname2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Wireless Headphones', fontSize: 16, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Name', isSection: false }, parent: 'prod2', nodes: [], linkedNodes: {} },
    pprice2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '$199', fontSize: 18, fontWeight: 700, color: '#6366f1' }, displayName: 'Text', custom: { displayName: 'Price', isSection: false }, parent: 'prod2', nodes: [], linkedNodes: {} },
    prod3: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 16, flexDirection: 'column', gap: 12, width: '250px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Product', isSection: false }, parent: 'grid', nodes: ['pimg3', 'pname3', 'pprice3'], linkedNodes: {} },
    pimg3: { type: { resolvedName: 'Image' }, isCanvas: false, props: { src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=220&h=220&q=80', width: '100%', height: '200px', borderRadius: 8 }, displayName: 'Image', custom: { displayName: 'Image', isSection: false }, parent: 'prod3', nodes: [], linkedNodes: {} },
    pname3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Camera Lens', fontSize: 16, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Name', isSection: false }, parent: 'prod3', nodes: [], linkedNodes: {} },
    pprice3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '$449', fontSize: 18, fontWeight: 700, color: '#6366f1' }, displayName: 'Text', custom: { displayName: 'Price', isSection: false }, parent: 'prod3', nodes: [], linkedNodes: {} },
  },
};

// Simple templates for remaining sections
export const caseStudiesTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#ffffff', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 32 }, displayName: 'Section', custom: { displayName: 'Case Studies', componentType: 'case_studies', isSection: true }, nodes: ['title', 'desc'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Case Studies', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    desc: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'See how our clients achieved success with our solutions.', fontSize: 16, color: '#64748b', textAlign: 'center' }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const whyJoinUsTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#f1f5f9', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 32 }, displayName: 'Section', custom: { displayName: 'Why Join Us', componentType: 'why_join_us', isSection: true }, nodes: ['title', 'benefits'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Why Join Us?', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    benefits: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 24, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Benefits', isSection: false }, parent: 'section', nodes: ['b1', 'b2', 'b3'], linkedNodes: {} },
    b1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '🏠 Remote Work', fontSize: 16, color: '#475569' }, displayName: 'Text', custom: { displayName: 'Benefit', isSection: false }, parent: 'benefits', nodes: [], linkedNodes: {} },
    b2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '💰 Competitive Pay', fontSize: 16, color: '#475569' }, displayName: 'Text', custom: { displayName: 'Benefit', isSection: false }, parent: 'benefits', nodes: [], linkedNodes: {} },
    b3: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '📈 Growth Opportunities', fontSize: 16, color: '#475569' }, displayName: 'Text', custom: { displayName: 'Benefit', isSection: false }, parent: 'benefits', nodes: [], linkedNodes: {} },
  },
};

export const privacyPolicyTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#ffffff', padding: '60px 20px', maxWidth: '800px', flexDirection: 'column', gap: 24 }, displayName: 'Section', custom: { displayName: 'Privacy Policy', componentType: 'privacy_policy', isSection: true }, nodes: ['title', 'content'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Privacy Policy', fontSize: 32, fontWeight: 700, color: '#1e293b', tagName: 'h1' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    content: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'This Privacy Policy describes how we collect, use, and protect your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.', fontSize: 15, color: '#475569', lineHeight: 1.7 }, displayName: 'Text', custom: { displayName: 'Content', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const termsOfServiceTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#ffffff', padding: '60px 20px', maxWidth: '800px', flexDirection: 'column', gap: 24 }, displayName: 'Section', custom: { displayName: 'Terms of Service', componentType: 'terms_of_service', isSection: true }, nodes: ['title', 'content'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Terms of Service', fontSize: 32, fontWeight: 700, color: '#1e293b', tagName: 'h1' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    content: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.', fontSize: 15, color: '#475569', lineHeight: 1.7 }, displayName: 'Text', custom: { displayName: 'Content', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
  },
};

export const resourcesTemplate1: TemplateNodeTree = {
  rootNodeId: 'section',
  nodes: {
    section: { type: { resolvedName: 'Section' }, isCanvas: true, props: { background: '#f1f5f9', padding: '80px 20px', maxWidth: '1200px', flexDirection: 'column', alignItems: 'center', gap: 32 }, displayName: 'Section', custom: { displayName: 'Resources', componentType: 'resources', isSection: true }, nodes: ['title', 'grid'], linkedNodes: {} },
    title: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Resources', fontSize: 32, fontWeight: 700, color: '#1e293b', textAlign: 'center', tagName: 'h2' }, displayName: 'Text', custom: { displayName: 'Title', isSection: false }, parent: 'section', nodes: [], linkedNodes: {} },
    grid: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: 'transparent', padding: 0, flexDirection: 'row', gap: 24, justifyContent: 'center' }, displayName: 'Container', custom: { displayName: 'Grid', isSection: false }, parent: 'section', nodes: ['r1', 'r2'], linkedNodes: {} },
    r1: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 24, flexDirection: 'column', gap: 12, width: '280px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Resource', isSection: false }, parent: 'grid', nodes: ['rn1', 'rd1'], linkedNodes: {} },
    rn1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '📄 Documentation', fontSize: 18, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Name', isSection: false }, parent: 'r1', nodes: [], linkedNodes: {} },
    rd1: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Complete guides and API references.', fontSize: 14, color: '#64748b' }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'r1', nodes: [], linkedNodes: {} },
    r2: { type: { resolvedName: 'Container' }, isCanvas: true, props: { background: '#ffffff', padding: 24, flexDirection: 'column', gap: 12, width: '280px', borderRadius: 12 }, displayName: 'Container', custom: { displayName: 'Resource', isSection: false }, parent: 'grid', nodes: ['rn2', 'rd2'], linkedNodes: {} },
    rn2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: '🎥 Tutorials', fontSize: 18, fontWeight: 600, color: '#1e293b' }, displayName: 'Text', custom: { displayName: 'Name', isSection: false }, parent: 'r2', nodes: [], linkedNodes: {} },
    rd2: { type: { resolvedName: 'Text' }, isCanvas: false, props: { text: 'Video tutorials and walkthroughs.', fontSize: 14, color: '#64748b' }, displayName: 'Text', custom: { displayName: 'Desc', isSection: false }, parent: 'r2', nodes: [], linkedNodes: {} },
  },
};

// Export all template maps
export const CONTACT_TEMPLATES: Record<string, TemplateNodeTree> = { 'contact-1': contactTemplate1, 'contact-2': contactTemplate2, 'contact-3': contactTemplate3, 'contact-4': contactTemplate4 };
export const FAQ_TEMPLATES: Record<string, TemplateNodeTree> = { 'faq-1': faqTemplate1, 'faq-2': faqTemplate2, 'faq-3': faqTemplate3, 'faq-4': faqTemplate4 };
export const TESTIMONIALS_TEMPLATES: Record<string, TemplateNodeTree> = { 'testimonials-1': testimonialsTemplate1, 'testimonials-2': testimonialsTemplate2, 'testimonials-3': testimonialsTemplate3, 'testimonials-4': testimonialsTemplate4 };
export const NEWSLETTER_TEMPLATES: Record<string, TemplateNodeTree> = { 'newsletter-1': newsletterTemplate1, 'newsletter-2': newsletterTemplate2, 'newsletter-3': newsletterTemplate3, 'newsletter-4': newsletterTemplate4 };
export const SOCIALS_TEMPLATES: Record<string, TemplateNodeTree> = { 'socials-1': socialsTemplate1, 'socials-2': socialsTemplate1, 'socials-3': socialsTemplate1, 'socials-4': socialsTemplate1 };
export const BLOGS_TEMPLATES: Record<string, TemplateNodeTree> = { 'blogs-1': blogsTemplate1, 'blogs-2': blogsTemplate1, 'blogs-3': blogsTemplate1, 'blogs-4': blogsTemplate1 };
export const PRODUCT_TEMPLATES: Record<string, TemplateNodeTree> = { 'product-1': productTemplate1, 'product-2': productTemplate1, 'product-3': productTemplate1, 'product-4': productTemplate1 };
export const CASE_STUDIES_TEMPLATES: Record<string, TemplateNodeTree> = { 'case_studies-1': caseStudiesTemplate1, 'case_studies-2': caseStudiesTemplate1, 'case_studies-3': caseStudiesTemplate1, 'case_studies-4': caseStudiesTemplate1 };
export const WHY_JOIN_US_TEMPLATES: Record<string, TemplateNodeTree> = { 'why_join_us-1': whyJoinUsTemplate1, 'why_join_us-2': whyJoinUsTemplate1, 'why_join_us-3': whyJoinUsTemplate1, 'why_join_us-4': whyJoinUsTemplate1 };
export const PRIVACY_POLICY_TEMPLATES: Record<string, TemplateNodeTree> = { 'privacy_policy-1': privacyPolicyTemplate1, 'privacy_policy-2': privacyPolicyTemplate1, 'privacy_policy-3': privacyPolicyTemplate1, 'privacy_policy-4': privacyPolicyTemplate1 };
export const TERMS_OF_SERVICE_TEMPLATES: Record<string, TemplateNodeTree> = { 'terms_of_service-1': termsOfServiceTemplate1, 'terms_of_service-2': termsOfServiceTemplate1, 'terms_of_service-3': termsOfServiceTemplate1, 'terms_of_service-4': termsOfServiceTemplate1 };
export const RESOURCES_TEMPLATES: Record<string, TemplateNodeTree> = { 'resources-1': resourcesTemplate1, 'resources-2': resourcesTemplate1, 'resources-3': resourcesTemplate1, 'resources-4': resourcesTemplate1 };
