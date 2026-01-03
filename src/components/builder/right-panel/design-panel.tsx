'use client';

import { Box, ScrollArea, Accordion } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useState } from 'react';
import { Icons } from '@/icons';
import Image from 'next/image';
import { BackgroundDesignPanel } from './background-design-panel';
import { AssetDesignPanel } from './asset-design-panel';
import { TypographyDesignPanel } from './typography-design-panel';
import { GridDesignPanel } from './grid-design-panel';
import { LayoutDesignPanel } from './layout-design-panel';
import { ButtonDesignPanel } from './button-design-panel';
import { NavbarSettings } from './navbar-settings';
import { ProductSettings } from './product-settings';
import { FooterSettings } from './footer-settings';
import { ContactFormSettings } from './contact-form-settings';
import { useComponentPanels, shouldShowPanel, type PanelType } from './hooks';

export const DesignPanel = memo(() => {
  const [activeTab] = useState<'design' | 'blocks'>('design');
  
  // Mock subscription data
  const freeTrialEnded = false;

  // Get panels to show based on selected component
  const { panels, componentId, hasSelection, componentType, selectedNode } = useComponentPanels();

  // Render individual panel by type
  const renderPanel = (panelType: PanelType) => {
    switch (panelType) {
      case 'typography':
        return <TypographyDesignPanel componentId={componentId} />;
      case 'button':
        return <ButtonDesignPanel componentId={componentId} />;
      case 'asset':
        return <AssetDesignPanel componentId={componentId} />;
      case 'background':
        return <BackgroundDesignPanel componentId={componentId} />;
      case 'layout':
        return <LayoutDesignPanel componentId={componentId} />;
      case 'grid':
        return <GridDesignPanel componentId={componentId} />;
      case 'navbar-settings':
        return <NavbarSettings freeTrialEnded={freeTrialEnded} />;
      case 'footer-settings':
        return <FooterSettings freeTrialEnded={freeTrialEnded} />;
      case 'product-settings':
        return <ProductSettings freeTrialEnded={freeTrialEnded} selectedComponent={selectedNode} />;
      case 'contact-settings':
        return <ContactFormSettings selectedComponent={selectedNode} />;
      default:
        return null;
    }
  };

  // Get panel display name for accordion headers
  const getPanelDisplayName = (panelType: PanelType): string => {
    const names: Record<PanelType, string> = {
      'typography': 'Typography',
      'button': 'Button Style',
      'asset': 'Image & Media',
      'background': 'Background',
      'layout': 'Layout',
      'grid': 'Grid',
      'navbar-settings': 'Navbar Settings',
      'footer-settings': 'Footer Settings',
      'product-settings': 'Product Settings',
      'contact-settings': 'Contact Form',
    };
    return names[panelType] || panelType;
  };

  // Render the appropriate design panel(s) based on component type
  const renderDesignPanels = () => {
    if (!hasSelection) {
      return (
        <div className="w-full h-[calc(100vh-180px)] bg-white flex flex-col items-center justify-center flex-1">
          {/* Empty State Section */}
          <div className="flex-1 h-full flex flex-col items-center justify-center p-4">
            {/* Cursor Icon in Circle */}
            <div className="mb-8 flex items-center justify-center">
              <Image
                width={96}
                height={96}
                alt="cursor"
                src="/images/cursor.png"
                className="rounded-full"
                unoptimized
              />
            </div>

            {/* Title */}
            <h2 className="text-base font-semibold text-[#161616] mb-2 text-center">
              Nothing Selected yet
            </h2>

            {/* Description */}
            <p className="text-center text-[#323232] text-sm leading-relaxed">
              Click any section, text, or image on the canvas to edit its settings here.
            </p>
          </div>

          {/* Quick Tips Section */}
          <div className="p-4 mt-auto bg-[#F6F6F6] rounded-2xl">
            {/* Tips Header */}
            <div className="flex items-center gap-2 mb-4">
              <Icons.KaiLogo className="w-5 h-5 text-primary flex-shrink-0" />
              <h3 className="font-bold text-gray-900 text-sm">Quick tips - Kai</h3>
            </div>

            {/* Tips List */}
            <ul className="space-y-3">
              {[
                'Double–click any text to start editing immediately.',
                'Click any element to see more options on your right panel (Right here...)',
                'Move sections up or down to reorder your layout.',
                'Use "Preview" to see how your website looks on mobile before publishing.',
                'Use the Left panel to quickly update your fonts and colors globally (Coming Soon).',
              ].map((tip, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-gray-400 text-xs flex-shrink-0 mt-0.5">•</span>
                  <span className="text-gray-700 text-[11px] leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    // If only one panel, render it directly without accordion
    if (panels.length === 1) {
      return renderPanel(panels[0]);
    }

    // Multiple panels - render as accordion
    return (
      <Accordion
        defaultValue={panels}
        multiple
        variant="separated"
        classNames={{
          root: 'space-y-2',
          item: 'border border-gray-200 rounded-lg overflow-hidden',
          control: 'py-3 px-4 hover:bg-gray-50',
          label: 'text-sm font-medium text-gray-700',
          panel: 'px-4 pb-4',
          chevron: 'text-gray-400',
        }}
      >
        {panels.map((panelType) => (
          <Accordion.Item key={panelType} value={panelType}>
            <Accordion.Control>{getPanelDisplayName(panelType)}</Accordion.Control>
            <Accordion.Panel>{renderPanel(panelType)}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  };

  return (
    <>
      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'design' ? (
            <>
              {/* Desktop View */}
              <Box
                style={{
                  pointerEvents: freeTrialEnded ? 'none' : 'auto',
                }}
                className="md:block hidden p-0"
              >
                <ScrollArea.Autosize
                  className="overflow-y-auto p-0"
                  style={{
                    height: 'calc(100vh - 100px)',
                    pointerEvents: freeTrialEnded ? 'none' : 'auto',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 px-4 pt-4 mb-4">
                    <Icons.SolarPallette />
                    <h1 className="font-semibold text-lg">Design</h1>
                    {hasSelection && (
                      <span className="text-xs text-gray-500 ml-auto capitalize">
                        {componentType}
                      </span>
                    )}
                  </div>

                  {/* Dynamic Design Panel Content */}
                  <div className="px-4 pb-4">{renderDesignPanels()}</div>
                </ScrollArea.Autosize>
              </Box>

              {/* Mobile View */}
              <Box
                style={{
                  pointerEvents: freeTrialEnded ? 'none' : 'auto',
                }}
                className="md:hidden block p-0"
              >
                {/* Dynamic Design Panel Content */}
                <div className="p-4">{renderDesignPanels()}</div>
              </Box>
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </>
  );
});
