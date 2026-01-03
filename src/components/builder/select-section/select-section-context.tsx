'use client';

import { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { SectionType } from './section-templates-data';

export type SectionModalActionType = 'add' | 'replace' | null;
export type LayoutType = 'grid' | 'list';

interface SelectSectionContextType {
  // Modal state
  isModalOpen: boolean;
  openModal: (actionType: SectionModalActionType, defaultSection?: SectionType) => void;
  closeModal: () => void;
  
  // Selected section type (sidebar selection)
  selectedSection: SectionType;
  setSelectedSection: (section: SectionType) => void;
  
  // Layout type
  layoutType: LayoutType;
  setLayoutType: (type: LayoutType) => void;
  
  // Action type (add or replace)
  actionType: SectionModalActionType;
  
  // Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  
  // Target node ID (for replacement)
  targetNodeId: string | null;
  setTargetNodeId: (id: string | null) => void;
}

const SelectSectionContext = createContext<SelectSectionContextType | undefined>(undefined);

interface SelectSectionProviderProps {
  children: ReactNode;
}

export const SelectSectionProvider = ({ children }: SelectSectionProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionType>('hero');
  const [layoutType, setLayoutType] = useState<LayoutType>('grid');
  const [actionType, setActionType] = useState<SectionModalActionType>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [targetNodeId, setTargetNodeId] = useState<string | null>(null);

  const openModal = useCallback((action: SectionModalActionType, defaultSection?: SectionType) => {
    setActionType(action);
    if (defaultSection) {
      setSelectedSection(defaultSection);
    }
    setSearchTerm('');
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setActionType(null);
    setTargetNodeId(null);
    setSearchTerm('');
  }, []);

  const value: SelectSectionContextType = {
    isModalOpen,
    openModal,
    closeModal,
    selectedSection,
    setSelectedSection,
    layoutType,
    setLayoutType,
    actionType,
    searchTerm,
    setSearchTerm,
    targetNodeId,
    setTargetNodeId,
  };

  return (
    <SelectSectionContext.Provider value={value}>
      {children}
    </SelectSectionContext.Provider>
  );
};

export const useSelectSection = () => {
  const context = useContext(SelectSectionContext);
  if (context === undefined) {
    throw new Error('useSelectSection must be used within a SelectSectionProvider');
  }
  return context;
};
