'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { CustomSegmentedControl, MultiSelectDropdown, ToolGroup } from '../common';
import { Select, Tooltip } from '@mantine/core';
import { Icons } from '@/icons';
import { NavigationBrandStyle } from '../common/navigation-brand-style';
import { NavigationTemplateModal } from './navigation-template-modal';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarSettingsProps {
  freeTrialEnded: boolean;
}


/**
 * Navbar Style State Interface
 * 
 * Represents all the configurable style options for the navbar component.
 * This state is managed by the hook and synced with the GrapesJS editor.
 */
export interface NavbarStylesState {
  logo_type: 'image' | 'typography';
  logo_position: 'left' | 'center' | 'right';
  show_cart_icon: boolean;
  colour_scheme: 'light' | 'dark';
  navigation_style:
    | 'solid_sticky'
    | 'solid_not_sticky'
    | 'transparent_not_sticky'
    | 'transparent_solid_on_scroll';
  bottom_edge_style: 'none' | 'shadow' | 'border';
  logo_size: 'small' | 'medium' | 'large';
  icon_size: 'small' | 'medium' | 'large';
  show_login_button: boolean;
  show_search_button: boolean;
  cta_text: string;
  cta_link: string;
}

export const NavbarSettings = ({ freeTrialEnded }: NavbarSettingsProps) => {
   const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);
    const [navbarStyles, setNavbarStyles] = useState<NavbarStylesState>({
    logo_type: 'image',
    logo_position: 'center',
    show_cart_icon: true,
    colour_scheme: 'light',
    navigation_style: 'solid_sticky',
    bottom_edge_style: 'none',
    logo_size: 'small',
    show_login_button: true,
    show_search_button: false,
    icon_size: 'small',
    cta_text: 'Shop now',
    cta_link: '',
  });

    // Navigation Style options
  const navigationStyleOptions = [
    { label: 'Solid (Sticky)', value: 'solid_sticky' },
    { label: 'Solid (Not Sticky)', value: 'solid_not_sticky' },
    { label: 'Transparent (Not Sticky)', value: 'transparent_not_sticky' },
    { label: 'Transparent (Solid on Scroll)', value: 'transparent_solid_on_scroll' },
  ];

  // Bottom Edge Style options
  const bottomEdgeStyleOptions = [
    { label: 'None', value: 'none' },
    { label: 'Shadow', value: 'shadow' },
    { label: 'Border', value: 'border' },
  ];

  // Additional Element options
  const additionalElementOptions = [
    { label: 'Cart Icon', value: 'cart' },
    { label: 'Search Icon', value: 'search' },
    { label: 'Call to Action (CTA)', value: 'cta' },
  ];

    const getSelectedAdditionalElements = () => {
    const selected: string[] = [];
    if (navbarStyles.show_cart_icon) selected.push('cart');
    if (navbarStyles.show_search_button) selected.push('search');
    if (navbarStyles.show_login_button) selected.push('cta');
    return selected;
  };

  return (
     <div className="space-y-4 pb-6">
      {/* Navigation Templates Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground">Navigation Templates</span>
            <Tooltip
              label="Choose a navigation template"
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-3 h-3 text-muted-foreground" />
            </Tooltip>
          </div>
        }
        direction="column"
      >
        <div className="flex items-center gap-3 flex-1 w-full justify-between">
          <div className="flex items-center w-full gap-3">
            <div className="w-[72px] h-12 bg-secondary rounded-lg border border-border flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Preview</span>
            </div>
            {/* Display actual template name */}
            <p className="text-xs font-medium text-foreground truncate max-w-[120px]">
            Template
            </p>
          </div>
          <button
            onClick={() => !freeTrialEnded && setIsTemplateModalOpen(true)}
            className="text-xs flex items-center gap-1 font-medium text-primary hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={freeTrialEnded}
          >
            Change <ChevronRight className="w-3 h-3 text-primary" />
          </button>
        </div>
      </ToolGroup>

      {/* Navigation Template Modal */}
      <NavigationTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        freeTrialEnded={freeTrialEnded}
        currentNavbarConfig={undefined}
      />

      {/* Brand Logo Section */}
      <NavigationBrandStyle
        brandStyle={{
          logo_type: navbarStyles.logo_type,
          logo_position: navbarStyles.logo_position,
          logo_size: navbarStyles.logo_size,
        }}
        setBrandStyle={(values) => {
          if (!values) return;
          setNavbarStyles((prev) => ({
            ...prev,
            logo_type: values.logo_type,
            logo_position: values.logo_position,
            logo_size: values.logo_size,
          }));
        }}
        onNameChange={(name) => {
        }}
      />

      {/* Logo Size Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground">Logo Size</span>
            <Tooltip
              label="Adjust the size of your logo"
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-3 h-3 text-muted-foreground" />
            </Tooltip>
          </div>
        }
        direction="column"
        className="pb-4 border-b border-border"
      >
        <CustomSegmentedControl
          data={[
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ]}
          className="w-full"
          value={navbarStyles.logo_size}
          onChange={(value) => {}}
        />
      </ToolGroup>

      {/* Navigation Style Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground">Navigation Style</span>
            <Tooltip
              label="Choose how your navbar behaves at the top of the page and while scrolling."
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-3 h-3 text-muted-foreground" />
            </Tooltip>
          </div>
        }
      >
        <Select
          value={navbarStyles.navigation_style}
          onChange={(value) => {}}
          data={navigationStyleOptions}
          disabled={freeTrialEnded}
          classNames={{
            input: 'border-stroke w-[120px] rounded-lg h-[32px] text-xs',
            dropdown: 'rounded-xl',
            options: 'hover:rounded-xl font-light text-xs',
            option: 'text-xs p-3',
          }}
          comboboxProps={{ zIndex: 100000000, withinPortal: true }}
        />
      </ToolGroup>

      {/* Colour Scheme Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground">Colour Scheme</span>
            <Tooltip
              label="Switch between a light or dark colour style for your navbar text, icons, and background."
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-3 h-3 text-muted-foreground" />
            </Tooltip>
          </div>
        }
        direction="column"
      >
        <CustomSegmentedControl
          data={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ]}
          className="w-full"
          value={navbarStyles.colour_scheme}
          onChange={(value) => {}}
        />
      </ToolGroup>

      {/* Bottom Edge Style Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground">Bottom Edge Style</span>
            <Tooltip
              label="Add a shadow or bottom border to the bottom edge of your navbar."
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-3 h-3 text-muted-foreground" />
            </Tooltip>
          </div>
        }
        className="pb-4 border-b border-border"
      >
        <Select
          value={navbarStyles.bottom_edge_style}
          onChange={(value) => value && {}}
          data={bottomEdgeStyleOptions}
          disabled={freeTrialEnded}
          classNames={{
            input: 'border-stroke w-[120px] rounded-lg h-[32px] text-xs',
            dropdown: 'rounded-xl',
            options: 'hover:rounded-xl font-light text-xs',
            option: 'text-xs p-3',
          }}
          comboboxProps={{ zIndex: 100000000, withinPortal: true }}
        />
      </ToolGroup>

      {/* Additional Element Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground">Additional Elements</span>
            <Tooltip
              label="Show or hide certain elements like icons or buttons on the navbar."
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-3 h-3 text-muted-foreground" />
            </Tooltip>
          </div>
        }
        className="w-full"
      >
        <MultiSelectDropdown
          value={getSelectedAdditionalElements()}
          options={additionalElementOptions}
          onChange={(value) => {}}
        />
      </ToolGroup>

      {/* Icon Size Section */}
      <ToolGroup
        label={
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground">Icon Size</span>
            <Tooltip
              label="Set how big your right-side icons should appear."
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-3 h-3 text-muted-foreground" />
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
          className="w-full"
          value={navbarStyles.icon_size}
          onChange={(value) => {}}
        />
      </ToolGroup>

      {/* Button Text Section */}
      <ToolGroup
        label={
          <div className="flex items-center justify-start gap-2 w-full">
            <span className="text-xs text-foreground">Button Text</span>
            <Tooltip
              label="The text that appears inside the CTA button."
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-3 h-3 text-muted-foreground" />
            </Tooltip>
          </div>
        }
        direction="column"
      >
        <Input
          type="text"
          placeholder="Enter button text"
          className="w-full rounded-lg"
          disabled={freeTrialEnded}
        />
      </ToolGroup>

      {/* Link/URL Section */}
      <ToolGroup
        label={
          <div className="flex items-center justify-start gap-2">
            <span className="text-xs text-foreground">Link/URL</span>
            <Tooltip
              label="Choose where the CTA button leads when clicked."
              multiline
              w={220}
              withArrow
              radius="md"
              styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
            >
              <Icons.Info className="w-3 h-3 text-muted-foreground" />
            </Tooltip>
          </div>
        }
        direction="column"
      >
        <Input
          type="text"
          placeholder='Enter link here or type "/" to link to another page.'
          className="w-full rounded-lg"
          disabled={freeTrialEnded}
        />
      </ToolGroup>

      {/* Apply Button */}
      <div className="w-full pt-4">
        <Button
          disabled={freeTrialEnded}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white p-2 rounded-xl transition-colors"
        >
          Apply Configs
        </Button>
      </div>
    </div>
  );
};
