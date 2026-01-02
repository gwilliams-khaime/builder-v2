"use client";

import React from "react";
import { TOOLBAR_ICONS } from "./icons";
import type { 
  ToolbarButtonProps, 
  AddSectionButtonProps, 
  ComponentLabelProps,
  SelectionBorderProps,
  IndicatorPosition 
} from "./types";
import {
  shouldShowLinkIcon,
  shouldShowResizeIcon,
  shouldShowReplaceMediaIcon,
} from "./utils";

/**
 * Toolbar button component - 24x24px wrapper
 */
export const ToolbarButton = ({ 
  icon, 
  onClick, 
  title,
  separator = false 
}: ToolbarButtonProps) => (
  <div className="flex items-center gap-2">
    {separator && <div className="w-px h-6 bg-gray-200" />}
    <button
      onClick={onClick}
      title={title}
      className="w-6 h-6 cursor-pointer flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
    >
      {icon}
    </button>
  </div>
);

/**
 * Add Section Button - Cyan color, centered
 */
export const AddSectionButton = ({ 
  position, 
  top, 
  left, 
  width,
  onClick 
}: AddSectionButtonProps) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 px-4 py-2 bg-[#42C3FF] cursor-pointer hover:bg-[#3BB8F0] text-white rounded-full shadow-lg transition-colors"
    style={{
      position: "fixed",
      top: position === "top" ? top - 14 : top - 16,
      left: left + (width / 2),
      transform: "translateX(-50%)",
      zIndex: 10000,
      fontSize: "12px",
    }}
  >
    {TOOLBAR_ICONS.addSection}
    <span className="font-medium">Add Section</span>
  </button>
);

/**
 * Component type label (pill badge)
 */
export const ComponentLabel = ({ name, style }: ComponentLabelProps) => (
  <div
    style={{
      position: "fixed",
      zIndex: 9999,
      pointerEvents: "auto",
      ...style,
    }}
  >
    <div className="flex items-center gap-1 px-3 py-1.5 bg-[#42C3FF] text-white text-xs font-medium rounded-full">
      <span>{name}</span>
      {TOOLBAR_ICONS.chevronRight}
    </div>
  </div>
);

/**
 * Selection/hover border overlay
 */
export const SelectionBorder = ({ position, isDashed = false }: SelectionBorderProps) => (
  <div
    style={{
      position: "fixed",
      top: position.top,
      left: position.left,
      width: position.width,
      height: position.height,
      border: isDashed ? "2px dashed #42C3FF" : "3px solid #42C3FF",
      pointerEvents: "none",
      zIndex: isDashed ? 9997 : 9998,
    }}
  />
);

/**
 * Section toolbar (inside the selection, top-left)
 */
interface SectionToolbarProps {
  position: IndicatorPosition;
  componentType: string;
  showSettings: boolean;
  isFirstSection: boolean;
  isLastSection: boolean;
  isNavbar: boolean;
  isFooter: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onReplace: () => void;
  onDuplicate: () => void;
  onSettings: () => void;
  onDelete: () => void;
  onMore: () => void;
  onAddSectionTop: () => void;
  onAddSectionBottom: () => void;
}

export const SectionToolbar = ({
  position,
  componentType,
  showSettings,
  isFirstSection,
  isLastSection,
  isNavbar,
  isFooter,
  onMoveUp,
  onMoveDown,
  onReplace,
  onDuplicate,
  onSettings,
  onDelete,
  onMore,
  onAddSectionTop,
  onAddSectionBottom,
}: SectionToolbarProps) => {
  // Determine which move buttons to show based on section position
  const showMoveUp = !isFirstSection;
  const showMoveDown = !isLastSection;

  return (
    <>
      {/* Selection border */}
      <SelectionBorder position={position} />

      {/* Component type label - inside top left */}
      <ComponentLabel 
        name={componentType} 
        style={{ top: position.top + 12, left: position.left + 12 }} 
      />

      {/* Toolbar - inside below the label */}
      <div
        style={{
          position: "fixed",
          top: position.top + 44,
          left: position.left + 12,
          zIndex: 9999,
          pointerEvents: "auto",
        }}
      >
        <div className="flex items-center bg-white rounded-full shadow-lg px-2 py-1.5 gap-2.5">
          {showMoveUp && (
            <ToolbarButton icon={TOOLBAR_ICONS.moveUp} onClick={onMoveUp} title="Move Up" />
          )}
          {showMoveDown && (
            <ToolbarButton icon={TOOLBAR_ICONS.moveDown} onClick={onMoveDown} title="Move Down" />
          )}
          <ToolbarButton 
            icon={TOOLBAR_ICONS.replace} 
            onClick={onReplace} 
            title="Replace" 
            separator={showMoveUp || showMoveDown} 
          />
          <ToolbarButton icon={TOOLBAR_ICONS.duplicate} onClick={onDuplicate} title="Duplicate" />
          {showSettings && (
            <ToolbarButton icon={TOOLBAR_ICONS.settings} onClick={onSettings} title="Settings" />
          )}
          <ToolbarButton icon={TOOLBAR_ICONS.delete} onClick={onDelete} title="Delete" />
          <ToolbarButton icon={TOOLBAR_ICONS.more} onClick={onMore} title="More" separator />
        </div>
      </div>

      {/* Add Section buttons - only for sections */}
      {!(isFirstSection && isNavbar) && (
        <AddSectionButton
          position="top"
          top={position.top}
          left={position.left}
          width={position.width}
          onClick={onAddSectionTop}
        />
      )}
      {!(isLastSection && isFooter) && (
        <AddSectionButton
          position="bottom"
          top={position.top + position.height}
          left={position.left}
          width={position.width}
          onClick={onAddSectionBottom}
        />
      )}
    </>
  );
};

/**
 * Element toolbar (outside the selection, above)
 */
interface ElementToolbarProps {
  position: IndicatorPosition;
  componentType: string;
  selectedNode: any;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onLink: () => void;
  onResize: () => void;
  onReplaceMedia: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMore: () => void;
}

export const ElementToolbar = ({
  position,
  componentType,
  selectedNode,
  onMoveLeft,
  onMoveRight,
  onLink,
  onResize,
  onReplaceMedia,
  onDuplicate,
  onDelete,
  onMore,
}: ElementToolbarProps) => {
  // Calculate space needed - label height (~24px) + gap (8px) + toolbar height (~36px) + gap (12px)
  const toolbarOffset = 80;

  // Determine which icons to show based on component type
  const showLinkIcon = shouldShowLinkIcon(selectedNode);
  const showResizeIcon = shouldShowResizeIcon(selectedNode);
  const showReplaceMediaIcon = shouldShowReplaceMediaIcon(selectedNode);

  return (
    <>
      {/* Selection border */}
      <SelectionBorder position={position} />

      {/* Component type label - above the element with proper spacing */}
      <ComponentLabel 
        name={componentType} 
        style={{ top: position.top - toolbarOffset, left: position.left }} 
      />

      {/* Toolbar - below the label, above the element with proper spacing */}
      <div
        style={{
          position: "fixed",
          top: position.top - toolbarOffset + 32,
          left: position.left,
          zIndex: 9999,
          pointerEvents: "auto",
        }}
      >
        <div className="flex items-center bg-white rounded-full shadow-lg px-2 py-1.5 gap-2.5">
          <ToolbarButton icon={TOOLBAR_ICONS.moveLeft} onClick={onMoveLeft} title="Move Left" />
          <ToolbarButton icon={TOOLBAR_ICONS.moveRight} onClick={onMoveRight} title="Move Right" />
          {showLinkIcon && (
            <ToolbarButton icon={TOOLBAR_ICONS.link} onClick={onLink} title="Link" separator />
          )}
          {showResizeIcon && (
            <ToolbarButton 
              icon={TOOLBAR_ICONS.resize} 
              onClick={onResize} 
              title="Resize" 
              separator={!showLinkIcon}
            />
          )}
          {showReplaceMediaIcon && (
            <ToolbarButton 
              icon={TOOLBAR_ICONS.replaceMedia} 
              onClick={onReplaceMedia} 
              title="Replace Media" 
              separator={!showLinkIcon && !showResizeIcon}
            />
          )}
          <ToolbarButton 
            icon={TOOLBAR_ICONS.duplicate} 
            onClick={onDuplicate} 
            title="Duplicate" 
            separator={!showLinkIcon && !showResizeIcon && !showReplaceMediaIcon}
          />
          <ToolbarButton icon={TOOLBAR_ICONS.delete} onClick={onDelete} title="Delete" />
          <ToolbarButton icon={TOOLBAR_ICONS.more} onClick={onMore} title="More" separator />
        </div>
      </div>
    </>
  );
};

/**
 * Hover indicator (dashed border with label)
 */
interface HoverIndicatorProps {
  position: IndicatorPosition;
  componentType: string;
  isSection: boolean;
}

export const HoverIndicator = ({ position, componentType, isSection }: HoverIndicatorProps) => (
  <>
    {/* Hover border - dashed */}
    <SelectionBorder position={position} isDashed />

    {/* Hover label */}
    <div
      style={{
        position: "fixed",
        top: isSection ? position.top + 8 : position.top - 28,
        left: isSection ? position.left + 8 : position.left,
        zIndex: 9997,
        pointerEvents: "none",
      }}
    >
      <div className="flex items-center gap-1 px-2 py-1.5 bg-[#42C3FF] text-white text-xs font-medium rounded-full">
        <span>{componentType}</span>
        {TOOLBAR_ICONS.chevronRight}
      </div>
    </div>
  </>
);
