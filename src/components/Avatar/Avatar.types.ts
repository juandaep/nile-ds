import type { ReactNode } from "react";

export type AvatarType = 'profile' | 'text' | 'icon-filled' | 'icon-outlined' | 'icon-multiple';
export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  type: AvatarType;
  size: AvatarSize;
  text?: string;
  photoUrl?: string;
  icon?: ReactNode; 
}