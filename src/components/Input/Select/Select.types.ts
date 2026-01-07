import type { ReactNode } from "react"

export type SelectMode = "Select Only" | "Searchable"

export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = {
  id?: string
  name?: string
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (v: string) => void
  placeholder?: string
  mode?: SelectMode
  clearable?: boolean
  showLeadIcon?: boolean
  leadIcon?: ReactNode
  disabled?: boolean
  error?: boolean
  className?: string
}
