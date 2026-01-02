"use client";

import { Editor, Frame, Element } from "@craftjs/core";
import React, { ReactNode } from "react";
import { Container, Text, Button, Image, Section, Root } from "./user-components";
import { defaultTemplate } from "./templates/default-template";

// Map of all user components for Craft.js resolver
const resolver = {
  Root,
  Container,
  Text,
  Button,
  Image,
  Section,
};

interface CraftEditorProps {
  children: ReactNode;
  enabled?: boolean;
}

export const CraftEditor = ({ 
  children, 
  enabled = true,
}: CraftEditorProps) => {
  return (
    <Editor
      resolver={resolver}
      enabled={enabled}
    >
      {children}
    </Editor>
  );
};

interface CraftCanvasProps {
  templateJson?: string | null;
}

export const CraftCanvas = ({ templateJson }: CraftCanvasProps) => {
  // Use provided template JSON or fall back to default template
  const template = templateJson || JSON.stringify(defaultTemplate);

  return (
    <Frame data={template}>
      <Element
        is={Root}
        canvas
      />
    </Frame>
  );
};

// Export resolver for external use
export { resolver };
