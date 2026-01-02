"use client";

import { useNode, Element } from "@craftjs/core";
import React, { ReactNode } from "react";

export interface ContainerProps {
  background?: string;
  padding?: number;
  margin?: number;
  flexDirection?: "row" | "column";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
  gap?: number;
  minHeight?: string;
  width?: string;
  children?: ReactNode;
}

export const Container = ({
  background = "transparent",
  padding = 20,
  margin = 0,
  flexDirection = "column",
  alignItems = "stretch",
  justifyContent = "flex-start",
  gap = 0,
  minHeight = "auto",
  width = "100%",
  children,
}: ContainerProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        background,
        padding: `${padding}px`,
        margin: `${margin}px`,
        display: "flex",
        flexDirection,
        alignItems,
        justifyContent,
        gap: `${gap}px`,
        minHeight,
        width,
      }}
    >
      {children}
    </div>
  );
};

Container.craft = {
  displayName: "Container",
  props: {
    background: "transparent",
    padding: 20,
    margin: 0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: 0,
    minHeight: "auto",
    width: "100%",
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
  related: {},
};
