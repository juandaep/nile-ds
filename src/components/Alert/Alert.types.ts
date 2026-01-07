import type { ReactNode } from "react"

export type AlertVariant = "Info" | "Success" | "Warning" | "Danger"

export interface AlertProps {
  variant?: AlertVariant
  children?: ReactNode
  dismissible?: boolean
  onClose?: () => void
}