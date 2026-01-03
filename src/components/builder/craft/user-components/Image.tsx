"use client";

import { useNode } from "@craftjs/core";
import React from "react";

export interface ImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  borderRadius?: number;
  href?: string;
}

export const Image = ({
  src = "https://via.placeholder.com/400x300",
  alt = "Image",
  width = "100%",
  height = "auto",
  objectFit = "cover",
  borderRadius = 0,
  href = "",
}: ImageProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <img
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      src={src}
      alt={alt}
      style={{
        width,
        height,
        objectFit,
        borderRadius: `${borderRadius}px`,
        display: "block",
      }}
    />
  );
};

Image.craft = {
  displayName: "Image",
  props: {
    src: "https://via.placeholder.com/400x300",
    alt: "Image",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: 0,
    href: "",
  },
  rules: {
    canDrag: () => true,
    canDrop: () => false,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {},
};
