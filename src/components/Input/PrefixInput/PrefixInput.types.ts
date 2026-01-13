
export type PrefixInputProps = {
  id?: string
  name?: string
  prefix: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (next: string) => void
  disabled?: boolean
  error?: boolean
  clearable?: boolean
  className?: string
  charType?: "Alpha" | "Numeric" | "Alphanumeric" | "Symbol" | "All"
}
