export type LogoHeight = 'small' | 'medium' | 'large';
export type LogoAlignment = 'left' | 'center' | 'right';

export type MobileMenuPosition = 'left' | 'right';
export type MobileMenuAnimation = 'slide' | 'fade' | 'none';
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

export type ShadowSize = 'none' | 'sm' | 'md' | 'lg';
export type PaddingSize = 'none' | 'compact' | 'normal' | 'relaxed';
export type MaxWidth = 'full' | 'container' | 'narrow';

export type DropdownAnimation = 'fade' | 'slide' | 'none';
export type BorderRadiusSize = 'none' | 'sm' | 'md' | 'lg' | 'full';

export type NavigationGap = 'none' | 'tight' | 'normal' | 'wide';
export type NavigationFontSize = 'sm' | 'base' | 'lg';
export type NavigationPosition = 'left' | 'center' | 'right';
export type NavigationItemStyle = 'default' | 'pill' | 'underline';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export type ColorScheme = 'light' | 'dark' | 'custom';

export type IconSize = 'small' | 'medium' | 'large';
export type LoginStyle = 'link' | 'button';

export interface LogoConfig {
  height: LogoHeight;
  maxWidth: number;
  alignment: LogoAlignment;
  type?: 'image' | 'typography'; // Added logo type field
}

export interface MobileConfig {
  position: MobileMenuPosition;
  showLogo: boolean;
  animation: MobileMenuAnimation;
  breakpoint: Breakpoint;
}

export interface GeneralConfig {
  shadow: ShadowSize;
  sticky: boolean;
  padding: PaddingSize;
  maxWidth: MaxWidth;
  borderBottom: boolean;
}

export interface AdvancedConfig {
  zIndex: number;
  customClasses: string;
  grapesJsAttributes: boolean;
}

export interface DropdownConfig {
  offset: number;
  shadow: ShadowSize;
  minWidth: number;
  animation: DropdownAnimation;
  borderRadius: BorderRadiusSize;
}

export interface CustomColors {
  text: string;        // hex or any CSS color
  hover: string;
  accent: string;
  background: string;
}

export interface NavigationConfig {
  gap: NavigationGap;
  fontSize: NavigationFontSize;
  position: NavigationPosition;
  itemStyle: NavigationItemStyle;
  fontWeight: FontWeight;
}

export interface RightSectionConfig {
  ctaLink: string;
  ctaText: string;
  showCta: boolean;
  iconSize: IconSize;
  showCart: boolean;
  loginText: string;
  showLogin: boolean;
  loginStyle: LoginStyle;
  showSearch: boolean;
}

export interface NavSubpage {
  title: string;
  path: string;
}

export interface NavLink {
  name: string;
  link: string;
  show: boolean;
  showDropdown?: boolean;
  subpages?: NavSubpage[];
}

export interface NavbarConfig {
  logo: LogoConfig;
  mobile: MobileConfig;
  general: GeneralConfig;
  advanced: AdvancedConfig;
  dropdown: DropdownConfig;
  templateName: string; // e.g. "noma
  navigation: NavigationConfig;
  colorScheme: ColorScheme;
  customColors: CustomColors;
  rightSection: RightSectionConfig;
  customNavLinks: NavLink[];
}