import type { ReactNode } from "react"

export type ButtonSize = "lg" | "md" | "sm"
export type ButtonVariant =
  | "Primary"
  | "Secondary"
  | "Tertiary"
  | "Ghost"
  | "Danger"
export type ButtonOption = "Default" | "Loading" | "Icon Only"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  variant?: ButtonVariant
  option?: ButtonOption
  leadIcon?: ReactNode
  text: ReactNode
  trailIcon?: ReactNode
}
