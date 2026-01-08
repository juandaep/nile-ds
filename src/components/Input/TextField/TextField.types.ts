import React from "react"

export type TextFieldProps = {
  id?: string
  name?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (next: string) => void
  disabled?: boolean
  /** Visual state override: 'default' | 'focused' | 'disabled' */
  state?: "default" | "focused" | "disabled"
  error?: boolean
  showLeadIcon?: boolean
  showTrailIcon?: boolean
  leadIcon?: React.ReactNode
  trailIcon?: React.ReactNode
  clearable?: boolean
  /** Character restriction: choose which characters are allowed. Options:
   * 'alpha' - letters only (A-Z/a-z)
   * 'numeric' - digits only (0-9)
   * 'alphanumeric' - letters and digits
   * 'symbol' - non-alphanumeric characters (punctuation, spaces, symbols)
   * 'all' - no restriction
   */
  charType?: "Alpha" | "Numeric" | "Alphanumeric" | "Symbol" | "All"
  className?: string
}
