// Basic type aliases for footer configuration
export type ColorScheme = 'light' | 'dark' | 'brand' | 'custom';
export type ShadowSize = 'none' | 'sm' | 'md' | 'lg';
export type PaddingSize = 'none' | 'compact' | 'normal' | 'relaxed';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type FontSize = 'xs' | 'sm' | 'base' | 'lg';
export type BorderRadiusSize = 'none' | 'sm' | 'md' | 'lg' | 'full';

// Social media link configuration
export interface SocialMediaLinks {
  instagram?: string;
  facebook?: string;
  x_twitter?: string;
  twitter?: string; // legacy fallback
  x?: string; // legacy fallback
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  pinterest?: string;
}

// Contact information configuration
export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  showEmail?: boolean;
  showPhone?: boolean;
  showAddress?: boolean;
}

// Custom contact block (for footer_config.customBlocks.contacts)
export interface CustomContactBlock {
  type: 'phone' | 'email' | 'address' | 'other';
  label: string;
  value: string;
  order?: number;
}

// Custom location block (for footer_config.customBlocks.locations)
export interface CustomLocationBlock {
  label: string;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  isVirtual?: boolean;
  order?: number;
}

// Custom additional links (for footer_config.customBlocks.additionalLinks)
export interface CustomAdditionalLink {
  label: string;
  url: string;
  openInNewTab?: boolean;
  order?: number;
}

// Custom blocks container
export interface CustomBlocks {
  contacts?: CustomContactBlock[];
  locations?: CustomLocationBlock[];
  additionalLinks?: CustomAdditionalLink[];
}

// Logo configuration for footer
export interface FooterLogoConfig {
  show: boolean;
  height?: 'small' | 'medium' | 'large'; // Translates to h-8, h-12, h-16
  size?: 'small' | 'medium' | 'large'; // Alias for height
  maxWidth?: number; // in pixels
  alignment?: 'left' | 'center' | 'right';
  useImage?: boolean; // If false, show business name instead
}

// Quick links configuration
export interface QuickLinksConfig {
  show: boolean;
  title?: string; // Default: "Quick Links"
  includePages?: boolean; // Auto-generate from database pages
  customLinks?: Array<{
    title: string;
    path: string;
    order?: number;
  }>;
}

// Business info section configuration
export interface BusinessInfoConfig {
  showLogo: boolean;
  showName: boolean;
  showDescription: boolean;
  descriptionMaxLength?: number; // Default: 150 characters
}

// Currency selector configuration
export interface CurrencyConfig {
  show: boolean;
  position?: 'footer' | 'navbar' | 'both';
  defaultCurrency?: string; // Default: 'USD'
  supportedCurrencies?: string[]; // If not specified, show all
}

// Social media section configuration
export interface SocialMediaConfig {
  show: boolean;
  title?: string; // Default: "Follow Us"
  links: SocialMediaLinks;
  iconSize?: 'small' | 'medium' | 'large';
  iconShape?: 'square' | 'circle' | 'rounded';
  iconStyle?: 'color' | 'solid' | 'outlined' | 'square' | 'circular' | 'star';
  showLabels?: boolean; // Show platform names alongside icons
}

// Layout configuration
export interface FooterLayoutConfig {
  columns: 1 | 2 | 3 | 4; // Number of columns on desktop
  mobileColumns: 1 | 2; // Number of columns on mobile
  verticalAlignment?: 'top' | 'center' | 'bottom';
  horizontalAlignment?: 'left' | 'center' | 'right';
}

// General styling configuration
export interface FooterGeneralConfig {
  shadow: ShadowSize;
  padding: PaddingSize;
  borderTop: boolean;
  borderBottom: boolean;
  maxWidth?: 'full' | 'container' | 'narrow';
}

// Advanced configuration
export interface FooterAdvancedConfig {
  zIndex?: number;
  customClasses?: string;
  grapesJsAttributes?: boolean;
  customCSS?: string;
}

// Typography configuration
export interface FooterTypographyConfig {
  headingSize: FontSize;
  bodySize: FontSize;
  headingWeight: FontWeight;
  bodyWeight: FontWeight;
  linkHoverEffect?: 'underline' | 'color' | 'both' | 'none';
}

// Color configuration
export interface CustomColors {
  text: string; // hex or any CSS color
  hover: string;
  accent: string;
  background: string;
  border?: string;
}

// Copyright section configuration
export interface CopyrightConfig {
  show: boolean;
  text?: string; // Custom copyright text
  showYear?: boolean; // Auto-inject current year
  showBusinessName?: boolean;
  showPoweredBy?: boolean; // "Powered by Khaime"
  customLinks?: Array<{
    text: string;
    url: string;
  }>;
}

// Newsletter subscription configuration (optional)
export interface NewsletterConfig {
  show: boolean;
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  apiEndpoint?: string;
}

/* 
{
    colorScheme: "light" | "dark";
    showAddress: boolean;
    showPhone: boolean;
    showNewsletter: boolean;
    showKhaimeWatermark: boolean;
    logoType: "icon" | "word";
    showCurrency: boolean;
    currencies: string[];
    customClasses: string;
    showSocialLinks: boolean;
    template: string;
}
*/

// Main footer configuration interface
export interface FooterConfig {
  // Template selection
  templateName?: string; // e.g., "default", "minimal", "detailed" (defaults to "default")

  // Color scheme
  colorScheme: ColorScheme;
  customColors?: CustomColors;

  // Main sections
  logo: FooterLogoConfig;
  businessInfo: BusinessInfoConfig;
  contact: ContactInfo;
  socialMedia: SocialMediaConfig;
  quickLinks: QuickLinksConfig;
  currency: CurrencyConfig;
  copyright: CopyrightConfig;

  // Optional sections
  newsletter?: NewsletterConfig;
  customBlocks?: CustomBlocks;

  // Layout & Styling
  layout: FooterLayoutConfig;
  general: FooterGeneralConfig;
  typography: FooterTypographyConfig;
  advanced: FooterAdvancedConfig;

  // Additional configuration
  additionalElements?: string[];
  logoSize?: 'small' | 'medium' | 'large';
  iconStyle?: 'color' | 'solid' | 'outlined' | 'square' | 'circular' | 'star';
}

export const defaultFooterConfig = {
    templateName: 'default',
    colorScheme: 'light',
    logo: {
      show: true,
      height: 'medium',
      maxWidth: 200,
      alignment: 'left',
      useImage: true,
    } as FooterLogoConfig,
    businessInfo: {
      showLogo: true,
      showName: true,
      showDescription: true,
      descriptionMaxLength: 150,
    },
    contact: {
      showEmail: true,
      showPhone: true,
      showAddress: true,
    },
    socialMedia: {
      show: true,
      links: {},
      iconSize: 'medium',
      iconShape: 'rounded',
      showLabels: false,
    } as SocialMediaConfig,
    quickLinks: {
      show: true,
      title: 'Quick Links',
      includePages: true,
    },
    currency: {
      show: false,
      position: 'footer',
      defaultCurrency: 'USD',
    } as CurrencyConfig,
    copyright: {
      show: true,
      showYear: true,
      showBusinessName: true,
      showPoweredBy: true,
    },
    layout: {
      columns: 3,
      mobileColumns: 1,
      verticalAlignment: 'top',
      horizontalAlignment: 'left',
    } as FooterLayoutConfig,
    general: {
      shadow: 'none',
      padding: 'normal',
      borderTop: true,
      borderBottom: false,
      maxWidth: 'container',
    } as FooterGeneralConfig,
    typography: {
      headingSize: 'lg',
      bodySize: 'sm',
      headingWeight: 'semibold',
      bodyWeight: 'normal',
      linkHoverEffect: 'both',
    } as FooterTypographyConfig,
    advanced: {
      zIndex: 10,
      customClasses: '',
      grapesJsAttributes: true,
    } as FooterAdvancedConfig,
  }