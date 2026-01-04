'use client';

import { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { SectionType } from './section-templates-data';

export type SectionModalActionType = 'add' | 'replace' | null;
export type LayoutType = 'grid' | 'list';
export type InsertPosition = 'above' | 'below' | null;

interface SelectSectionContextType {
  // Modal state
  isModalOpen: boolean;
  openModal: (actionType: SectionModalActionType, defaultSection?: SectionType, position?: InsertPosition) => void;
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
  
  // Target node ID (for replacement or position reference)
  targetNodeId: string | null;
  setTargetNodeId: (id: string | null) => void;
  
  // Insert position (above or below the target node)
  insertPosition: InsertPosition;
  setInsertPosition: (position: InsertPosition) => void;
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
  const [insertPosition, setInsertPosition] = useState<InsertPosition>(null);

  const openModal = useCallback((action: SectionModalActionType, defaultSection?: SectionType, position?: InsertPosition) => {
    setActionType(action);
    if (defaultSection) {
      setSelectedSection(defaultSection);
    }
    if (position) {
      setInsertPosition(position);
    }
    setSearchTerm('');
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setActionType(null);
    setTargetNodeId(null);
    setInsertPosition(null);
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
    insertPosition,
    setInsertPosition,
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
