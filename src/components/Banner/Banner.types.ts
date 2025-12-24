import type { ReactNode } from "react"

export type BannerVariant =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "general"

export type BannerDesignType = "outlined" | "side-border"

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
