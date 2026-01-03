/**
 * Static section templates data
 * Each section type has at least 4 templates that can be selected
 */

// Section types available in the builder
export const SECTION_TYPES = [
  'navbar',
  'hero',
  'about',
  'banner',
  'team',
  'gallery',
  'services',
  'features',
  'socials',
  'newsletter',
  'testimonials',
  'case_studies',
  'why_join_us',
  'privacy_policy',
  'pricing',
  'terms_of_service',
  'resources',
  'contact',
  'faq',
  'blogs',
  'product',
  'footer',
] as const;

export type SectionType = typeof SECTION_TYPES[number];

export interface SectionTemplate {
  id: string;
  name: string;
  category: SectionType;
  previewImage?: string;
  description?: string;
}

// Static templates organized by section type
export const SECTION_TEMPLATES: Record<SectionType, SectionTemplate[]> = {
  navbar: [
    { id: 'navbar-1', name: 'Classic Navbar', category: 'navbar', description: 'Simple navigation with logo and links' },
    { id: 'navbar-2', name: 'Centered Logo', category: 'navbar', description: 'Logo in the center with links on both sides' },
    { id: 'navbar-3', name: 'Modern Dark', category: 'navbar', description: 'Dark themed navigation bar' },
    { id: 'navbar-4', name: 'Transparent Overlay', category: 'navbar', description: 'Transparent navbar for hero overlays' },
  ],
  hero: [
    { id: 'hero-1', name: 'Centered Hero', category: 'hero', description: 'Centered text with CTA button' },
    { id: 'hero-2', name: 'Split Hero', category: 'hero', description: 'Image on one side, text on the other' },
    { id: 'hero-3', name: 'Video Background', category: 'hero', description: 'Hero with video background' },
    { id: 'hero-4', name: 'Gradient Hero', category: 'hero', description: 'Beautiful gradient background' },
  ],
  about: [
    { id: 'about-1', name: 'Image Left', category: 'about', description: 'Image on left, content on right' },
    { id: 'about-2', name: 'Image Right', category: 'about', description: 'Content on left, image on right' },
    { id: 'about-3', name: 'Stats Section', category: 'about', description: 'About with statistics' },
    { id: 'about-4', name: 'Timeline', category: 'about', description: 'Company timeline layout' },
  ],
  banner: [
    { id: 'banner-1', name: 'Simple Banner', category: 'banner', description: 'Clean promotional banner' },
    { id: 'banner-2', name: 'CTA Banner', category: 'banner', description: 'Banner with call-to-action' },
    { id: 'banner-3', name: 'Announcement', category: 'banner', description: 'Announcement style banner' },
    { id: 'banner-4', name: 'Sale Banner', category: 'banner', description: 'Special offer banner' },
  ],
  team: [
    { id: 'team-1', name: 'Grid Layout', category: 'team', description: 'Team members in a grid' },
    { id: 'team-2', name: 'Card Style', category: 'team', description: 'Team cards with social links' },
    { id: 'team-3', name: 'Minimal', category: 'team', description: 'Simple and clean team section' },
    { id: 'team-4', name: 'Creative', category: 'team', description: 'Unique and creative layout' },
  ],
  gallery: [
    { id: 'gallery-1', name: 'Grid Gallery', category: 'gallery', description: 'Standard image grid' },
    { id: 'gallery-2', name: 'Masonry', category: 'gallery', description: 'Masonry style layout' },
    { id: 'gallery-3', name: 'Carousel', category: 'gallery', description: 'Sliding image carousel' },
    { id: 'gallery-4', name: 'Lightbox', category: 'gallery', description: 'Gallery with lightbox preview' },
  ],
  services: [
    { id: 'services-1', name: 'Card Grid', category: 'services', description: 'Services in card format' },
    { id: 'services-2', name: 'Icon List', category: 'services', description: 'Services with icons' },
    { id: 'services-3', name: 'Alternating', category: 'services', description: 'Left-right alternating layout' },
    { id: 'services-4', name: 'Compact', category: 'services', description: 'Compact services list' },
  ],
  features: [
    { id: 'features-1', name: 'Three Column', category: 'features', description: 'Features in 3 columns' },
    { id: 'features-2', name: 'Icon Cards', category: 'features', description: 'Feature cards with icons' },
    { id: 'features-3', name: 'List Style', category: 'features', description: 'Vertical feature list' },
    { id: 'features-4', name: 'Tabs', category: 'features', description: 'Tabbed feature showcase' },
  ],
  socials: [
    { id: 'socials-1', name: 'Icon Bar', category: 'socials', description: 'Simple social icon bar' },
    { id: 'socials-2', name: 'Follow Us', category: 'socials', description: 'Follow us CTA section' },
    { id: 'socials-3', name: 'Feed Preview', category: 'socials', description: 'Social media feed preview' },
    { id: 'socials-4', name: 'Community', category: 'socials', description: 'Join our community section' },
  ],
  newsletter: [
    { id: 'newsletter-1', name: 'Simple Subscribe', category: 'newsletter', description: 'Simple email subscription' },
    { id: 'newsletter-2', name: 'With Image', category: 'newsletter', description: 'Newsletter with side image' },
    { id: 'newsletter-3', name: 'Dark Theme', category: 'newsletter', description: 'Dark themed newsletter' },
    { id: 'newsletter-4', name: 'Minimal', category: 'newsletter', description: 'Minimalist design' },
  ],
  testimonials: [
    { id: 'testimonials-1', name: 'Card Grid', category: 'testimonials', description: 'Testimonial cards in grid' },
    { id: 'testimonials-2', name: 'Carousel', category: 'testimonials', description: 'Sliding testimonials' },
    { id: 'testimonials-3', name: 'Quote Style', category: 'testimonials', description: 'Large quote format' },
    { id: 'testimonials-4', name: 'With Rating', category: 'testimonials', description: 'Testimonials with star ratings' },
  ],
  case_studies: [
    { id: 'case_studies-1', name: 'Card Layout', category: 'case_studies', description: 'Case study cards' },
    { id: 'case_studies-2', name: 'Featured', category: 'case_studies', description: 'Featured case studies' },
    { id: 'case_studies-3', name: 'Portfolio', category: 'case_studies', description: 'Portfolio style layout' },
    { id: 'case_studies-4', name: 'Detailed', category: 'case_studies', description: 'Detailed case study view' },
  ],
  why_join_us: [
    { id: 'why_join_us-1', name: 'Benefits List', category: 'why_join_us', description: 'List of benefits' },
    { id: 'why_join_us-2', name: 'Career Focus', category: 'why_join_us', description: 'Career-focused layout' },
    { id: 'why_join_us-3', name: 'Culture', category: 'why_join_us', description: 'Company culture showcase' },
    { id: 'why_join_us-4', name: 'Perks', category: 'why_join_us', description: 'Employee perks section' },
  ],
  privacy_policy: [
    { id: 'privacy_policy-1', name: 'Standard', category: 'privacy_policy', description: 'Standard policy layout' },
    { id: 'privacy_policy-2', name: 'With TOC', category: 'privacy_policy', description: 'Policy with table of contents' },
    { id: 'privacy_policy-3', name: 'Accordion', category: 'privacy_policy', description: 'Collapsible sections' },
    { id: 'privacy_policy-4', name: 'Simple', category: 'privacy_policy', description: 'Simple text layout' },
  ],
  pricing: [
    { id: 'pricing-1', name: 'Three Tier', category: 'pricing', description: 'Classic 3-tier pricing' },
    { id: 'pricing-2', name: 'Comparison', category: 'pricing', description: 'Feature comparison table' },
    { id: 'pricing-3', name: 'Toggle Monthly/Yearly', category: 'pricing', description: 'Pricing with toggle' },
    { id: 'pricing-4', name: 'Enterprise', category: 'pricing', description: 'Enterprise-focused pricing' },
  ],
  terms_of_service: [
    { id: 'terms_of_service-1', name: 'Standard', category: 'terms_of_service', description: 'Standard terms layout' },
    { id: 'terms_of_service-2', name: 'Numbered', category: 'terms_of_service', description: 'Numbered sections' },
    { id: 'terms_of_service-3', name: 'With Sidebar', category: 'terms_of_service', description: 'Terms with navigation sidebar' },
    { id: 'terms_of_service-4', name: 'Minimal', category: 'terms_of_service', description: 'Clean minimal layout' },
  ],
  resources: [
    { id: 'resources-1', name: 'Download Cards', category: 'resources', description: 'Downloadable resources' },
    { id: 'resources-2', name: 'Link List', category: 'resources', description: 'Resource links list' },
    { id: 'resources-3', name: 'Categories', category: 'resources', description: 'Categorized resources' },
    { id: 'resources-4', name: 'Featured', category: 'resources', description: 'Featured resources section' },
  ],
  contact: [
    { id: 'contact-1', name: 'Form with Map', category: 'contact', description: 'Contact form with map' },
    { id: 'contact-2', name: 'Split Layout', category: 'contact', description: 'Info on one side, form on other' },
    { id: 'contact-3', name: 'Simple Form', category: 'contact', description: 'Simple contact form' },
    { id: 'contact-4', name: 'Multiple Locations', category: 'contact', description: 'Multi-location contact' },
  ],
  faq: [
    { id: 'faq-1', name: 'Accordion', category: 'faq', description: 'Collapsible FAQ items' },
    { id: 'faq-2', name: 'Two Column', category: 'faq', description: 'FAQs in two columns' },
    { id: 'faq-3', name: 'Categorized', category: 'faq', description: 'FAQs by category' },
    { id: 'faq-4', name: 'Searchable', category: 'faq', description: 'FAQ with search' },
  ],
  blogs: [
    { id: 'blogs-1', name: 'Card Grid', category: 'blogs', description: 'Blog cards in grid' },
    { id: 'blogs-2', name: 'List View', category: 'blogs', description: 'Blog list layout' },
    { id: 'blogs-3', name: 'Featured', category: 'blogs', description: 'Featured blog post' },
    { id: 'blogs-4', name: 'Magazine', category: 'blogs', description: 'Magazine style layout' },
  ],
  product: [
    { id: 'product-1', name: 'Product Grid', category: 'product', description: 'Products in grid' },
    { id: 'product-2', name: 'Featured Product', category: 'product', description: 'Featured product showcase' },
    { id: 'product-3', name: 'Category Cards', category: 'product', description: 'Product categories' },
    { id: 'product-4', name: 'Slider', category: 'product', description: 'Product carousel slider' },
  ],
  footer: [
    { id: 'footer-1', name: 'Multi Column', category: 'footer', description: 'Multi-column footer' },
    { id: 'footer-2', name: 'Simple', category: 'footer', description: 'Simple centered footer' },
    { id: 'footer-3', name: 'With Newsletter', category: 'footer', description: 'Footer with newsletter signup' },
    { id: 'footer-4', name: 'Dark Theme', category: 'footer', description: 'Dark themed footer' },
  ],
};

// Get display name for a section type
export const getSectionDisplayName = (sectionType: SectionType): string => {
  return sectionType.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

// Get templates for a specific section type
export const getTemplatesForSection = (sectionType: SectionType): SectionTemplate[] => {
  return SECTION_TEMPLATES[sectionType] || [];
};
