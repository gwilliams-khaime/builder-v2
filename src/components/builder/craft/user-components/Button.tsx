"use client";

import { useNode } from "@craftjs/core";
import React from "react";

export interface ButtonProps {
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
  color?: string;
  background?: string;
  padding?: string;
  borderRadius?: number;
  border?: string;
  textAlign?: "left" | "center" | "right";
  width?: string;
  href?: string;
}

export const Button = ({
  text = "Click me",
  fontSize = 16,
  fontWeight = 600,
  color = "#ffffff",
  background = "#3b82f6",
  padding = "12px 24px",
  borderRadius = 8,
  border = "none",
  textAlign = "center",
  width = "auto",
  href = "#",
}: ButtonProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <button
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        fontSize: `${fontSize}px`,
        fontWeight,
        color,
        background,
        padding,
        borderRadius: `${borderRadius}px`,
        border,
        textAlign,
        width,
        cursor: "pointer",
        display: "inline-block",
      }}
      onClick={(e) => e.preventDefault()}
    >
      {text}
    </button>
  );
};

Button.craft = {
  displayName: "Button",
  props: {
    text: "Click me",
    fontSize: 16,
    fontWeight: 600,
    color: "#ffffff",
    background: "#3b82f6",
    padding: "12px 24px",
    borderRadius: 8,
    border: "none",
    textAlign: "center",
    width: "auto",
    href: "#",
  },
  rules: {
    canDrag: () => true,
    canDrop: () => false,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {},
};
