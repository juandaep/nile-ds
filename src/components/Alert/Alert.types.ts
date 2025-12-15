import type { ReactNode } from "react"

export type AlertVariant = "info" | "success" | "warning" | "danger"

export interface AlertProps {
  variant?: AlertVariant
  children?: ReactNode
  dismissible?: boolean
  onClose?: () => void
}