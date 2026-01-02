"use client";

import { useNode, useEditor } from "@craftjs/core";
import React, { useState, useEffect, useCallback } from "react";

export interface TextProps {
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
  color?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  lineHeight?: number;
  tagName?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
}

export const Text = ({
  text = "Edit this text",
  fontSize = 16,
  fontWeight = 400,
  color = "#000000",
  textAlign = "left",
  lineHeight = 1.5,
  tagName = "p",
}: TextProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!selected) {
      setEditable(false);
    }
  }, [selected]);

  const handleDoubleClick = useCallback(() => {
    if (enabled) {
      setEditable(true);
    }
  }, [enabled]);

  const Tag = tagName;

  return (
    <Tag
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        fontSize: `${fontSize}px`,
        fontWeight,
        color,
        textAlign,
        lineHeight,
        margin: 0,
        cursor: enabled ? "pointer" : "default",
        outline: editable ? "none" : undefined,
      }}
      contentEditable={editable}
      suppressContentEditableWarning={true}
      onDoubleClick={handleDoubleClick}
      onBlur={(e) => {
        setEditable(false);
        setProp((props: TextProps) => {
          props.text = e.currentTarget.innerText;
        });
      }}
    >
      {text}
    </Tag>
  );
};

Text.craft = {
  displayName: "Text",
  props: {
    text: "Edit this text",
    fontSize: 16,
    fontWeight: 400,
    color: "#000000",
    textAlign: "left",
    lineHeight: 1.5,
    tagName: "p",
  },
  rules: {
    canDrag: () => true,
    canDrop: () => false,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {},
};
