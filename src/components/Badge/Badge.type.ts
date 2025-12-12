import type { ReactNode } from "react";

export type BadgeType = 'Dot' | 'Number' | 'Text'; 
export type BadgeColor = 'Red' | 'Green' | 'Blue' | 'Grey' | 'White' | 'Black';
export type BadgeValue = number | string;

export interface BadgeProps {
  type: BadgeType;
  color: BadgeColor;
  value?: BadgeValue; 
  children?: ReactNode; 
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
