"use client";

import { useNode } from "@craftjs/core";
import React, { ReactNode } from "react";

export interface SectionProps {
  background?: string;
  padding?: string;
  minHeight?: string;
  maxWidth?: string;
  margin?: string;
  flexDirection?: "row" | "column";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
  gap?: number;
  children?: ReactNode;
}

export const Section = ({
  background = "#ffffff",
  padding = "60px 20px",
  minHeight = "auto",
  maxWidth = "1200px",
  margin = "0 auto",
  flexDirection = "column",
  alignItems = "center",
  justifyContent = "center",
  gap = 20,
  children,
}: SectionProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <section
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        background,
        padding,
        minHeight,
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth,
          margin,
          display: "flex",
          flexDirection,
          alignItems,
          justifyContent,
          gap: `${gap}px`,
          width: "100%",
        }}
      >
        {children}
      </div>
    </section>
  );
};

Section.craft = {
  displayName: "Section",
  props: {
    background: "#ffffff",
    padding: "60px 20px",
    minHeight: "auto",
    maxWidth: "1200px",
    margin: "0 auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
  related: {},
};
