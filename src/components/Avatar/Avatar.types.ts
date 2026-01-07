import type { ReactNode } from "react"

export type AvatarType = 'Profile' | 'Initial' | 'icon-filled' | 'icon-outlined' | 'icon-multiple'
export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps {
  type: AvatarType
  size: AvatarSize
  initial?: string
  photoUrl?: string
  icon?: ReactNode
}

export interface IconPlaceholderProps extends Pick<AvatarProps, "type" | "size"> {
  iconElement: ReactNode
}

export interface AvatarChildProps {
  size: AvatarSize
  iconElement: ReactNode
  childIndex: number
}

export interface AvatarMultipleProps extends Pick<AvatarProps, "size"> {
  iconElement: ReactNode
}