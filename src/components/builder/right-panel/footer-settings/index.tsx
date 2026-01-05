'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { CustomSegmentedControl } from '@/components/ui/segmented-control';
import { MultiSelectDropdown } from '@/components/ui/multi-select-dropdown';
import { ToolGroup } from '@/components/ui/tool-group';
import { Select, Tooltip } from '@mantine/core';
import { Icons } from '@/icons';
import { ChevronRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationBrandStyle } from '../navbar-settings/navigation-brand-style';
import { FooterTemplateModal } from './footer-template-modal';
import { useRouter } from 'next/navigation';
import { IconStyleDropdown } from '@/components/ui/icon-style-dropdown';

interface FooterSettingsProps {
  freeTrialEnded: boolean;
}

/**
 * Footer Style State Interface
 * 
 * Represents all the configurable style options for the footer component.
 * This state is managed by the hook and synced with the GrapesJS editor.
 */
export interface FooterStyleState {
  colorScheme: 'light' | 'dark' | 'brand';
  showAddress: boolean;
  showPhone: boolean;
  showEmail: boolean;
  showNewsletter: boolean;
  showKhaimeWatermark: boolean;
  logoType: 'icon' | 'word';
  logoSize: 'small' | 'medium' | 'large';
  logoPosition: 'left' | 'center' | 'right';
  showCurrency: boolean;
  customClasses: string;
  showSocialLinks: boolean;
  iconStyle: 'color' | 'solid' | 'outlined' | 'square' | 'circular' | 'star';
  additionalElements: string[];
}

export const FooterSettings = ({ freeTrialEnded }: FooterSettingsProps) => {
  const router = useRouter();
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isIconStyleDisabled, setIsIconStyleDisabled] = useState<boolean>(false);
 const [footerStyles, setFooterStyles] = useState<FooterStyleState>({
    colorScheme: 'light',
    showAddress: true,
    showPhone: true,
    showEmail: true,
    showNewsletter: true,
    showKhaimeWatermark: true,
    logoType: 'icon' as 'icon' | 'word',
    logoSize: 'small',
    logoPosition: 'left',
    showCurrency: true,
    customClasses: '',
    showSocialLinks: true,
    iconStyle: 'color',
    additionalElements: [],
  });

  const getSelectedAdditionalElements = () => {
    const selected: string[] = [];
    if (footerStyles.showAddress || footerStyles.showPhone || footerStyles.showEmail)
      selected.push('contact');
    if (footerStyles.showSocialLinks) selected.push('social');
    if (footerStyles.showCurrency) selected.push('currency');
    if (footerStyles.showNewsletter) selected.push('newsletter');
    if (footerStyles.showKhaimeWatermark) selected.push('watermark');
    return selected;
  };

  const iconStyleOptions = [
    { label: 'Colourful', value: 'color' },
    { label: 'Neutral', value: 'solid' },
    { label: 'Neutral - Outline', value: 'outlined' },
    { label: 'Square', value: 'square' },
    { label: 'Circle', value: 'circular' },
    { label: 'Star', value: 'star' },
  ];

  const iconStylesImgUrl: Record<string, string> = {
    color: '/images/social_links/color_group.png',
    solid: '/images/social_links/solid_group.png',
    outlined: '/images/social_links/outline_group.png',
    square: '/images/social_links/square_group.png',
    circular: '/images/social_links/circular_group.png',
    star: '/images/social_links/star_group.png',
  };

  const additionalElementOptions = [
    { label: 'Contact Information', value: 'contact' },
    { label: 'Social Links', value: 'social' },
    { label: 'Currency Dropdown', value: 'currency' },
    { label: 'Newsletter Input', value: 'newsletter' },
    { label: 'Khaime Watermark', value: 'watermark' },
  ];

  const handleAdditionalElementChange = (value: string, checked: boolean) => {
  }

  const handleNavigateToProfile = () => {
    // router.push(`${FRONTEND_URL.DASHBOARD_SETTINGS}?tab=profile`);
  };

  return (
      <div className="flex flex-col gap-4 pb-6 w-full">
      {/* Footer Style Templates Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-body">Footer Style Templates</span>
            <Tooltip label="Choose a footer template" multiline w={220} withArrow radius="md">
              <Icons.Info className="w-4 h-4" />
            </Tooltip>
          </div>
        }
        direction="column"
      >
        <div className="flex items-center gap-3 flex-1 w-full justify-between">
          <div className="flex items-center w-full gap-3">
            <div className="w-[72px] h-12 bg-secondary rounded-lg border border-border flex items-center justify-center">
              <span className="text-xs text-body">Preview</span>
            </div>
            <p className="text-xs font-medium text-title">Template name</p>
          </div>
          <button
            onClick={() => !freeTrialEnded && setIsTemplateModalOpen(true)}
            className="text-xs flex items-center gap-1 font-medium text-[#D93AF6] hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={freeTrialEnded}
          >
            Change <ChevronRight className="w-4 h-4 text-[#D93AF6]" />
          </button>
        </div>
      </ToolGroup>

      {/* Footer Template Modal */}
      <FooterTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        freeTrialEnded={freeTrialEnded}
        currentFooterConfig={undefined}
      />

      {/* Brand Logo Section */}

      <NavigationBrandStyle
        setBrandStyle={(values) => {
          if (!values) return;
          setFooterStyles((prev) => ({
            ...prev,
            logoType: values.logo_type === 'image' ? 'icon' : 'word',
            logoSize: values.logo_size || 'small',
            logoPosition: values.logo_position || 'left',
          }));
        }}
        brandStyle={{
          logo_position: footerStyles.logoPosition,
          logo_type: footerStyles.logoType === 'icon' ? 'image' : 'typography',
          logo_size: footerStyles.logoSize,
        }}
        onNameChange={(name) => {
        }}
      />

      {/* Logo Size Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-body">Logo Size</span>
            <Tooltip
              label="Choose the size of your logo"
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-4 h-4 text-red-500" />
            </Tooltip>
          </div>
        }
        direction="column"
      >
        <CustomSegmentedControl
          data={[
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ]}
          value={footerStyles.logoSize}
          onChange={(value) => {
            setFooterStyles((prev) => ({
              ...prev,
              logoSize: value as 'small' | 'medium' | 'large',
            }));
          }}
          className="w-full"
        />
      </ToolGroup>

      {/* Colour Scheme Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-body">Colour Scheme</span>
            <Tooltip
              label="Choose the color scheme for your footer"
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-4 h-4" />
            </Tooltip>
          </div>
        }
        direction="column"
      >
        <CustomSegmentedControl
          data={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Brand', value: 'brand' },
          ]}
          value={footerStyles.colorScheme}
          onChange={(value) => {
            setFooterStyles((prev) => ({
              ...prev,
              colorScheme: value as 'light' | 'dark' | 'brand',
            }));
          }}
          className="w-full"
        />
      </ToolGroup>

      {/* Additional Element Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-body">Additional Element</span>
            <Tooltip
              label="Select additional elements to display in the footer"
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-4 h-4" />
            </Tooltip>
          </div>
        }
      >
        <MultiSelectDropdown
          selectedItems={getSelectedAdditionalElements()}
          options={additionalElementOptions}
          onChange={handleAdditionalElementChange}
          disabled={freeTrialEnded}
        />
      </ToolGroup>

      {/* Contact Information Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-body">Contact Information</span>
            <Tooltip
              label="Manage your contact information"
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-4 h-4" />
            </Tooltip>
          </div>
        }
        className='mt-2'
      >
        <button
          onClick={handleNavigateToProfile}
          className="text-xs flex items-center gap-1 font-medium  underline text-[#D93AF6] hover:underline transition-colors"
        >
          <Settings className="w-4 h-4 text-[#D93AF6]" />
          Manage In Profile
        </button>
      </ToolGroup>

      {/* Social Links Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-body">Social Links</span>
            <Tooltip
              label="Manage your social media links"
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-4 h-4" />
            </Tooltip>
          </div>
        }
        className='mt-2'
      >
        <button
          onClick={handleNavigateToProfile}
          className="text-xs flex items-center gap-1 underline font-medium text-[#D93AF6] hover:underline transition-colors"
        >
          <Settings className="w-4 h-4 text-[#D93AF6]" />
          Manage In Profile
        </button>
      </ToolGroup>

      {/* Icon Style Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-body">Icon Style</span>
            <Tooltip
              label={
                isIconStyleDisabled
                  ? 'Icon style not applicable for text links'
                  : 'Choose the style for social media icons'
              }
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-4 h-4" />
            </Tooltip>
          </div>
        }
        direction="column"
      >
        <IconStyleDropdown
          value={footerStyles.iconStyle}
          onChange={(value: string) => {
            setFooterStyles((prev) => ({
              ...prev,
              iconStyle: value as 'color' | 'solid' | 'outlined' | 'square' | 'circular' | 'star',
            }));
          }}
          disabled={freeTrialEnded || isIconStyleDisabled}
          iconStylesImgUrl={iconStylesImgUrl}
          options={iconStyleOptions}
        />
        {isIconStyleDisabled && (
          <p className="text-[10px] text-orange-500 mt-1">
            Icon styles are disabled because some social links are detected as text.
          </p>
        )}
      </ToolGroup>

      {/* Apply Changes Button */}
      <div className="w-full pt-4">
        <Button
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white p-2 rounded-xl transition-colors"
          disabled={freeTrialEnded}
        >
          Apply Changes
        </Button>
      </div>
    </div>
  );
};
