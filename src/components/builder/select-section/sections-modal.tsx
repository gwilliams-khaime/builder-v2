'use client';

import { useCallback, useMemo, useState } from 'react';
import { useEditor } from '@craftjs/core';
import { ResponsiveModal } from '@/components/modals/responsive-modal';
import { useSelectSection } from './select-section-context';
import {
  SECTION_TYPES,
  getSectionDisplayName,
  getTemplatesForSection,
  SectionType,
  SectionTemplate,
} from './section-templates-data';
import { getTemplateContent, cloneTemplateWithUniqueIds } from './template-content';
import { cn } from '@/lib/utils';
import { Icons } from '@/icons';
import { Input } from '@/components/ui/input';

// Loading spinner
const Loader = () => (
  <div className="flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-[#4840E0] border-t-transparent rounded-full animate-spin" />
  </div>
);

export const SectionsModal = () => {
  const {
    isModalOpen,
    closeModal,
    selectedSection,
    setSelectedSection,
    layoutType,
    setLayoutType,
    actionType,
    searchTerm,
    setSearchTerm,
    targetNodeId,
    insertPosition,
  } = useSelectSection();

  const { actions: editorActions, query: editorQuery } = useEditor();
  const [isAddingSection, setIsAddingSection] = useState(false);

  // Filter templates based on search term
  const filteredTemplates = useMemo(() => {
    const templates = getTemplatesForSection(selectedSection);
    if (!searchTerm) return templates;
    
    const searchLower = searchTerm.toLowerCase();
    return templates.filter(
      (template) =>
        template.name.toLowerCase().includes(searchLower) ||
        template.description?.toLowerCase().includes(searchLower)
    );
  }, [selectedSection, searchTerm]);

  // Handle template selection
  const handleTemplateClick = useCallback(async (template: SectionTemplate) => {
    if (!editorActions || !editorQuery) return;
    
    setIsAddingSection(true);
    
    try {
      // Get root node to find insertion position
      const rootNode = editorQuery.node('ROOT').get();
      const siblings = rootNode?.data?.nodes || [];
      
      // Determine insert position
      let insertIndex = siblings.length;
      
      if (actionType === 'replace' && targetNodeId) {
        // Find the index of the node to replace
        const replaceIndex = siblings.indexOf(targetNodeId);
        
        if (replaceIndex !== -1) {
          // Delete the existing node
          editorActions.delete(targetNodeId);
          insertIndex = replaceIndex;
        }
      } else if (actionType === 'add' && targetNodeId && insertPosition) {
        // Add section relative to the target node based on insert position
        const targetIndex = siblings.indexOf(targetNodeId);
        
        if (targetIndex !== -1) {
          if (insertPosition === 'above') {
            // Insert before the target section
            insertIndex = targetIndex;
          } else if (insertPosition === 'below') {
            // Insert after the target section
            insertIndex = targetIndex + 1;
          }
        }
      } else {
        // Fallback: Add at the end or after the currently selected section
        const selectedIds = editorQuery.getEvent('selected').all();
        if (selectedIds.length > 0) {
          const selectedId = selectedIds[0];
          const selectedIndex = siblings.indexOf(selectedId);
          if (selectedIndex !== -1) {
            insertIndex = selectedIndex + 1;
          }
        }
      }
      
      // Get the template content JSON
      const templateContent = getTemplateContent(template.id);
      
      if (!templateContent) {
        console.error('Template content not found for:', template.id);
        closeModal();
        return;
      }
      
      // Clone the template with unique IDs to avoid conflicts
      const clonedTemplate = cloneTemplateWithUniqueIds(templateContent);
      
      // Convert serialized nodes to proper Node objects
      const nodes: Record<string, any> = {};
      const rootNodeId = clonedTemplate.rootNodeId;
      
      // Parse each serialized node into a proper Node using the query method
      const processNode = (nodeId: string, serializedNode: any, isRoot: boolean) => {
        const node = editorQuery.parseSerializedNode(serializedNode).toNode((n) => {
          // Normalize the node with our custom data
          n.id = nodeId;
          // Root section's parent should be 'ROOT', children keep their parent reference
          n.data.parent = isRoot ? 'ROOT' : serializedNode.parent;
          n.data.nodes = serializedNode.nodes || [];
          n.data.custom = serializedNode.custom || {};
        });
        nodes[nodeId] = node;
      };
      
      // Process root node first (it's the section being added)
      processNode(rootNodeId, clonedTemplate.nodes[rootNodeId], true);
      
      // Then process all child nodes
      Object.entries(clonedTemplate.nodes).forEach(([nodeId, serializedNode]) => {
        if (nodeId !== rootNodeId) {
          processNode(nodeId, serializedNode, false);
        }
      });
      
      const nodeTree = {
        rootNodeId,
        nodes,
      };
      
      // Add the new section at the determined position
      editorActions.addNodeTree(nodeTree, 'ROOT', insertIndex);
      
      // Close modal after successful addition
      closeModal();
    } catch (error) {
      console.error('Error adding section:', error);
    } finally {
      setIsAddingSection(false);
    }
  }, [editorActions, editorQuery, actionType, targetNodeId, insertPosition, closeModal]);

  // Get background color based on section type
  const getBackgroundForSection = (category: SectionType): string => {
    const backgrounds: Partial<Record<SectionType, string>> = {
      navbar: '#1e293b',
      hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      about: '#ffffff',
      banner: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      team: '#f8fafc',
      gallery: '#ffffff',
      services: '#f1f5f9',
      features: '#ffffff',
      socials: '#1e293b',
      newsletter: '#f8fafc',
      testimonials: '#ffffff',
      case_studies: '#ffffff',
      why_join_us: '#f1f5f9',
      privacy_policy: '#ffffff',
      pricing: '#f8fafc',
      terms_of_service: '#ffffff',
      resources: '#f1f5f9',
      contact: '#ffffff',
      faq: '#f8fafc',
      blogs: '#ffffff',
      product: '#f8fafc',
      footer: '#0f172a',
    };
    return backgrounds[category] || '#ffffff';
  };

  const isGridLayout = layoutType === 'grid';

  return (
    <ResponsiveModal
      isOpen={isModalOpen}
      onClose={closeModal}
      height="85vh"
      width="80%"
      radius={20}
      contentClassName="p-0"
      className="p-0"
    >
      <div className="flex overflow-hidden relative min-w-[400px] h-full bg-popover">
        {/* Loading overlay */}
        {isAddingSection && (
          <div className="absolute top-0 left-0 bg-background/70 z-[9999999] w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        )}

        {/* Sidebar - Section Types */}
        <div className="w-[20%] border-r border-border min-w-[14.375rem] flex flex-col">
          <div className="h-[72px] flex border-b border-border p-4 items-center flex-shrink-0">
            <h3 className="text-xl font-semibold text-foreground">
              Section
            </h3>
          </div>

          <div className="flex-grow overflow-y-auto mb-2 custom-scrollbar">
            <div className="w-full py-5">
              <div className="flex flex-col gap-4">
                {SECTION_TYPES.map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      setSelectedSection(section);
                      setSearchTerm('');
                    }}
                    className={cn(
                      'cursor-pointer py-2 px-4 rounded-[100px] mx-6 font-medium text-base capitalize text-left',
                      'hover:bg-primary/10 hover:text-primary transition-colors',
                      selectedSection === section
                        ? 'bg-primary/15 text-primary'
                        : 'bg-transparent text-foreground'
                    )}
                  >
                    <p className="truncate">{getSectionDisplayName(section)}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Templates */}
        <div className="flex-grow flex flex-col w-full">
          {/* Header */}
          <div className="h-[72px] flex border-b border-border p-4 justify-between items-center flex-shrink-0">
            <h3 className="text-xl font-semibold text-foreground">
              {getSectionDisplayName(selectedSection)} Section
            </h3>

            <div className="flex gap-4 items-center">
              {/* Search Input */}
              <Input
                type="text"
                placeholder="Search section"
                value={searchTerm}
                onChange={setSearchTerm}
                className="w-[200px] h-10 border border-border bg-input"
              />

              {/* Layout Toggle */}
              <div className="flex">
                <button
                  onClick={() => setLayoutType('grid')}
                  className={cn(
                    'p-2 rounded-l-lg transition-colors',
                    layoutType === 'grid' ? 'bg-primary/15' : 'bg-secondary',
                    'hover:bg-primary/15'
                  )}
                >
                  <Icons.GridIcon className={cn('w-5 h-5', layoutType === 'grid' ? 'text-primary' : 'text-muted-foreground')} />
                </button>
                <button
                  onClick={() => setLayoutType('list')}
                  className={cn(
                    'p-2 rounded-r-lg transition-colors',
                    layoutType === 'list' ? 'bg-primary/15' : 'bg-secondary',
                    'hover:bg-primary/15'
                  )}
                >
                  <Icons.ListIcon className={cn('w-5 h-5', layoutType === 'list' ? 'text-primary' : 'text-muted-foreground')} />
                </button>
              </div>
            </div>
          </div>

          {/* Templates Grid/List */}
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            <div
              className={cn(
                'px-10 py-4 gap-10',
                isGridLayout
                  ? 'grid grid-cols-2'
                  : 'flex flex-col justify-center items-center'
              )}
            >
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isGridLayout={isGridLayout}
                    onClick={() => handleTemplateClick(template)}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-8">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    className="mb-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? 'No templates found matching your search'
                      : 'No templates available for this section'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  );
};

// Template Card Component
interface TemplateCardProps {
  template: SectionTemplate;
  isGridLayout: boolean;
  onClick: () => void;
}

const TemplateCard = ({ template, isGridLayout, onClick }: TemplateCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'cursor-pointer flex flex-col px-3 py-6 bg-secondary overflow-hidden rounded-lg',
        'hover:bg-primary/10 transition-colors',
        isGridLayout ? 'w-full h-[200px] lg:h-[280px]' : 'w-full max-w-[600px] h-[200px]'
      )}
    >
      {/* Template Preview Placeholder */}
      <div className="flex-1 bg-muted rounded-lg flex items-center justify-center mb-2 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-2 bg-border rounded-lg flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-muted-foreground"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground">{template.description}</p>
          </div>
        </div>
      </div>

      {/* Template Name */}
      <div className="text-foreground text-sm font-medium text-center flex-shrink-0">
        {template.name}
      </div>
    </div>
  );
};
