/**
 * Types for the Indicator component
 */

export interface IndicatorPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  title: string;
  separator?: boolean;
}

export interface AddSectionButtonProps {
  position: "top" | "bottom";
  top: number;
  left: number;
  width: number;
  onClick: () => void;
}

export interface ComponentLabelProps {
  name: string;
  style?: React.CSSProperties;
}

export interface SelectionBorderProps {
  position: IndicatorPosition;
  isDashed?: boolean;
}
