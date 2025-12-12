import type { ReactNode } from "react";

export type ButtonSize = 'lg' | 'md' | 'sm';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type ButtonOption = 'default' | 'loading' | 'icon-only';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  option?: ButtonOption;
  leadIcon?: ReactNode;
  text: ReactNode;
  trailIcon?: ReactNode;
}