"use client";

import { useEditor, Element } from "@craftjs/core";
import React from "react";
import { Container, Text, Button, Image, Section } from "./user-components";

interface ToolboxItemProps {
  name: string;
  icon: React.ReactNode;
  component: React.ReactElement;
}

const ToolboxItem = ({ name, icon, component }: ToolboxItemProps) => {
  const { connectors } = useEditor();

  return (
    <div
      ref={(ref) => {
        if (ref) connectors.create(ref, component);
      }}
      className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-grab active:cursor-grabbing transition-colors border border-gray-200 hover:border-blue-300"
    >
      <div className="text-gray-600 mb-1">{icon}</div>
      <span className="text-xs text-gray-600 font-medium">{name}</span>
    </div>
  );
};

/**
 * ToolboxPanel - Draggable components panel
 * 
 * This component provides a list of components that can be dragged onto the canvas.
 * Following Craft.js documentation, it uses the connectors.create method to enable
 * drag-and-drop creation of new components.
 */
export const ToolboxPanel = () => {
  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Basic Elements</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Container */}
        <ToolboxItem
          name="Container"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
            </svg>
          }
          component={<Element is={Container} canvas padding={20} background="#f1f5f9" />}
        />

        {/* Section */}
        <ToolboxItem
          name="Section"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          }
          component={<Element is={Section} canvas padding="40px 20px" background="#ffffff" />}
        />

        {/* Text */}
        <ToolboxItem
          name="Text"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          }
          component={<Text text="Edit this text" />}
        />

        {/* Button */}
        <ToolboxItem
          name="Button"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          }
          component={<Button text="Click me" />}
        />

        {/* Image */}
        <ToolboxItem
          name="Image"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          component={<Image src="https://via.placeholder.com/400x300" alt="Placeholder" />}
        />

        {/* Heading */}
        <ToolboxItem
          name="Heading"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          }
          component={<Text text="Heading" fontSize={32} fontWeight={700} tagName="h2" />}
        />
      </div>

      <h3 className="text-sm font-semibold text-gray-700 mb-4 mt-6">Layout</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Two Column */}
        <ToolboxItem
          name="Two Columns"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          }
          component={
            <Element is={Container} canvas flexDirection="row" gap={20} padding={0}>
              <Element is={Container} canvas padding={20} background="#f1f5f9" width="50%" />
              <Element is={Container} canvas padding={20} background="#f1f5f9" width="50%" />
            </Element>
          }
        />

        {/* Three Column */}
        <ToolboxItem
          name="Three Columns"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5h4v14H4V5zm6 0h4v14h-4V5zm6 0h4v14h-4V5z" />
            </svg>
          }
          component={
            <Element is={Container} canvas flexDirection="row" gap={20} padding={0}>
              <Element is={Container} canvas padding={20} background="#f1f5f9" width="33.33%" />
              <Element is={Container} canvas padding={20} background="#f1f5f9" width="33.33%" />
              <Element is={Container} canvas padding={20} background="#f1f5f9" width="33.33%" />
            </Element>
          }
        />
      </div>
    </div>
  );
};
