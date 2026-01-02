"use client";

import { ReactNode, useState } from 'react';
import { EditorHeader } from '../EditorHeader';
import { LeftPanel } from '../LeftPanel';
import { RightPanel } from '../RightPanel';
import { CraftEditor, Indicator } from '../craft';

interface EditorLayoutProps {
  children: ReactNode;
}

type TabId = "add" | "layers" | "gallery" | "cms" | "product" | "saved" | "domain" | "notify" | "theme" | "dev";

export const EditorLayout = ({ children }: EditorLayoutProps) => {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId | null>(null);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  const handleTabClick = (tab: any) => {
    // If same tab clicked while open, toggle close
    if (activeTab === tab && leftPanelOpen) {
      setLeftPanelOpen(false);
      setActiveTab(null);
      setRightPanelOpen(true); // Re-open right panel?
    } else {
      // Open left panel
      setLeftPanelOpen(true);
      setActiveTab(tab);
      // Close right panel as requested
      setRightPanelOpen(false);
    }
  };

  const handleCloseLeftPanel = () => {
    setLeftPanelOpen(false);
    setActiveTab(null);
    setRightPanelOpen(true); // Restore right panel? Good default.
  };

  return (
    <CraftEditor enabled={true}>
      <div className="flex flex-col h-screen w-full bg-white text-slate-900">
        <EditorHeader />
        <div className="flex flex-1 overflow-hidden relative">
          {/* Left Panel (Sidebar + Drawer) - Now sibling to Main, not absolute */}
          <LeftPanel 
              isOpen={leftPanelOpen} 
              activeTab={activeTab} 
              onTabClick={handleTabClick}
              onClose={handleCloseLeftPanel}
          />
          
          {/* Main Canvas Area */}
          <main className="flex-1 overflow-auto bg-[#F6F6F6] relative p-4 transition-all duration-300">
              <div className="w-full min-h-full bg-white rounded-lg relative">
                  <div className="craftjs-renderer w-full">
                      {children}
                  </div>
              </div>
          </main>

          {/* Right Panel */}
          <RightPanel isOpen={rightPanelOpen} />
        </div>
      </div>
      
      {/* Craft.js Indicator for hover/selection outlines */}
      <Indicator />
    </CraftEditor>
  );
};
