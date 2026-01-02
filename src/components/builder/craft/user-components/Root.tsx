"use client";

import { useNode } from "@craftjs/core";
import React, { ReactNode } from "react";

export interface RootProps {
  children?: ReactNode;
  background?: string;
}

export const Root = ({ children, background = "#ffffff" }: RootProps) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      style={{
        width: "100%",
        minHeight: "100vh",
        background,
      }}
    >
      {children}
    </div>
  );
};

Root.craft = {
  displayName: "Root",
  props: {
    background: "#ffffff",
  },
  rules: {
    canDrag: () => false,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => false,
  },
  related: {},
};
