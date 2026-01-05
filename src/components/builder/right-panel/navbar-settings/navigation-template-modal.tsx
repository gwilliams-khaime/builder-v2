'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ResponsiveModal } from '@/components/modals/responsive-modal';
import { Input } from '@/components/ui/input';
import { NavbarConfig } from '@/types/navbar';



interface NavigationTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  freeTrialEnded?: boolean;
  currentNavbarConfig?: Partial<NavbarConfig>;
}

/**
 * NavigationTemplateModal - Flat, always-visible template selection modal
 * Displays navbar templates in a grid layout with preview iframes
 */

export const NavigationTemplateModal = ({
  isOpen,
  onClose,
  freeTrialEnded = false,
  currentNavbarConfig,
}: NavigationTemplateModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // Static navbar templates - will be replaced with API data later
  const templates = [
    'classic-business',
    'modern-minimal',
    'ecommerce-pro',
    'creative-agency',
    'portfolio-clean',
    'startup-bold',
    'restaurant-elegant',
    'tech-sleek',
  ];

  // Simulated loading state (set to false for static data)
  const isLoading = false;

  // Filter templates based on search query
  const filteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) return templates;
    return templates.filter((template) =>
      template.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  /**
   * Handles template selection and replacement
   * Replaces existing navbar or adds new one if none exists
   */
  const handleTemplateSelect = useCallback(
    async (template: string) => {
     
    },
    [
      onClose,
    ]
  );

  /**
   * Formats template name for display (capitalizes first letter of each word)
   */
  const formatTemplateName = useCallback((template: string) => {
    return template.replace(/\b\w/g, (char: string) => char.toUpperCase());
  }, []);

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      width={500}
      height={600}
      radius={16}
      isCenter={true}
      withCloseButton={!isApplying}
      title="Navigation Template"
      contentClassName="p-0"
    >
      <div className="flex flex-col h-full relative">
        {isApplying && (
          <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4" />
            <p className="text-sm font-medium text-foreground">Applying template settings...</p>
          </div>
        )}
        {/* Search Bar - Always visible, flat design */}
        <div className="px-6 py-4 flex-shrink-0">
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            disabled={freeTrialEnded || isApplying}
            className="w-full h-12"
            leftIcon={<Search className="w-4 h-4 text-muted-foreground" />}
          />
        </div>

        {/* Template Grid - Flat, always visible layout */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading && templates.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Loading templates...</p>
              </div>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'No templates found' : 'No navigation templates available'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredTemplates.map((template: string) => {
                // const isSelected = selectedTemplate === template;
                const isDisabled = freeTrialEnded || isLoading || isApplying;
                return (
                  <button
                    key={template}
                    onClick={() => !isDisabled && handleTemplateSelect(template)}
                    disabled={isDisabled}
                    className={cn(
                      'group relative bg-secondary rounded-xl transition-all duration-200 flex flex-col h-[150px] items-center justify-center overflow-hidden',
                      isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    )}
                    aria-label={`Select ${formatTemplateName(template)} template`}
                  >
                    {/* Template Preview - Centered and scaled */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <iframe
                        className="border-0"
                        scrolling="no"
                        style={{
                          pointerEvents: 'none',
                          overflow: 'hidden',
                          width: '1400px',
                          height: '80px',
                          transform: 'scale(0.32)',
                          transformOrigin: 'center center',
                        }}
                        loading="lazy"
                        // src={`${TEMPLATE_PREVIEW_URL}?type=navbar&name=${template}`}
                        title={`Preview of ${formatTemplateName(template)} template`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ResponsiveModal>
  );
};
