import type { ReactNode } from "react"

export type BannerVariant =
  | "Info"
  | "Success"
  | "Warning"
  | "Error"
  | "General"

export type BannerDesignType = "Outlined" | "Side Border"

export interface BannerProps {
  variant?: BannerVariant
  designType?: BannerDesignType
  title?: string
  children?: ReactNode
  dismissible?: boolean
  showFooterButtons?: boolean
  showTrailButton?: boolean
  onCancel?: () => void
  onTryAgain?: () => void
  onTrailButton?: () => void
}
