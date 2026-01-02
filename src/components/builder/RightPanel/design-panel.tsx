'use client';

import { Box, ScrollArea } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useState, useCallback } from 'react';
import { useEditor } from '@craftjs/core';
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

export const DesignPanel = memo(() => {
  const [activeTab] = useState<'design' | 'blocks'>('design');
  const [component, setComponent] = useState<any | null>(null);
  const [positionType] = useState<'flex' | 'grid' | 'none'>('none');
  
  // Mock subscription data
  const freeTrialEnded = false;

  // Get selected node from Craft.js
  const { selectedNodeId, selectedNode, actions, query } = useEditor((state, query) => {
    const selectedIds = Array.from(state.events.selected);
    const selectedId = selectedIds.length > 0 ? selectedIds[0] : null;
    
    let node = null;
    if (selectedId) {
      try {
        node = state.nodes[selectedId];
      } catch (e) {
        node = null;
      }
    }
    
    return {
      selectedNodeId: selectedId,
      selectedNode: node,
    };
  });

  // Component type definition
  type ComponentType = 'background' | 'asset' | 'typography' | 'layout' | 'button' | 'default' | 'navbar' | 'footer' | 'product' | 'contact' | 'carousel' | 'embed';

  // Get component type based on selected node
  const getComponentType = useCallback((): ComponentType => {
    if (!selectedNode) return 'default';
    
    // Get the display name from node data
    let displayName = selectedNode.data?.displayName || 'default';
    
    // If type is an object with resolvedName, use that
    const nodeType = selectedNode.data?.type;
    if (typeof nodeType === 'object' && nodeType !== null && 'resolvedName' in nodeType) {
      displayName = (nodeType as { resolvedName: string }).resolvedName || displayName;
    }
    
    // Also check custom displayName
    const customDisplayName = selectedNode.data?.custom?.displayName;
    if (customDisplayName) {
      displayName = customDisplayName;
    }
    
    switch (displayName.toLowerCase()) {
      case 'text':
        return 'typography';
      case 'button':
        return 'button';
      case 'image':
        return 'asset';
      case 'container':
      case 'section':
        return 'layout';
      case 'navbar':
      case 'header':
      case 'navigation':
        return 'navbar';
      case 'footer':
        return 'footer';
      case 'product':
        return 'product';
      case 'contact':
        return 'contact';
      case 'carousel':
        return 'carousel';
      case 'embed':
        return 'embed';
      case 'background':
        return 'background';
      default:
        return 'default';
    }
  }, [selectedNode]);

  const componentType = getComponentType();
  const componentId = selectedNodeId || '';

  // Render the appropriate design panel based on component type
  const renderDesignPanel = () => {
    if (!componentId) {
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

          {/* Quick Tips Section - adjusted padding to align with sidebar */}
          <div className="p-4 mt-auto bg-[#F6F6F6] rounded-2xl">
            {/* Tips Header */}
            <div className="flex items-center gap-2 mb-4">
              <Icons.KaiLogo className="w-5 h-5 text-primary flex-shrink-0" />
              <h3 className="font-bold text-gray-900 text-sm">Quick tips - Kai</h3>
            </div>

            {/* Tips List */}
            {(() => {
              const tips = [
                'Double–click any text to start editing immediately.',
                'Click any element to see more options on your right panel (Right here...)',
                'Move sections up or down to reorder your layout.',
                'Use "Preview" to see how your website looks on mobile before publishing.',
                'Use the Left panel to quickly update your fonts and colors globally (Coming Soon).',
              ];
              return (
                <ul className="space-y-3">
                  {tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-gray-400 text-xs flex-shrink-0 mt-0.5">•</span>
                      <span className="text-gray-700 text-[11px] leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>
        </div>
      );
    }

    switch (componentType) {
      case 'background':
        return <BackgroundDesignPanel componentId={componentId} />;
      case 'asset':
        return <AssetDesignPanel componentId={componentId} />;
      case 'typography':
        return <TypographyDesignPanel componentId={componentId} />;
      case 'layout':
        // Show grid panel for grid position, flex panel for flex position
        if (positionType === 'grid') {
          return <GridDesignPanel componentId={componentId} />;
        } else if (positionType === 'flex') {
          return <LayoutDesignPanel componentId={componentId} />;
        } else {
          // Default to flex panel if no position type detected
          return <LayoutDesignPanel componentId={componentId} />;
        }
      case 'button':
        return <ButtonDesignPanel componentId={componentId} />;
      case 'navbar':
        return <NavbarSettings freeTrialEnded={freeTrialEnded} />;
      case 'product':
        return <ProductSettings freeTrialEnded={freeTrialEnded} selectedComponent={component} />;
      case 'footer':
        return <FooterSettings freeTrialEnded={freeTrialEnded} />;
      case 'contact':
        return <ContactFormSettings selectedComponent={component} />;
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p className="text-sm">Default Design Panel</p>
            <p className="text-xs mt-2">General styling options will be here</p>
          </div>
        );
    }
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
                  </div>

                  {/* Dynamic Design Panel Content */}
                  <div className="px-4 pb-4">{renderDesignPanel()}</div>
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
                <div className="p-4">{renderDesignPanel()}</div>
              </Box>
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </>
  );
});
