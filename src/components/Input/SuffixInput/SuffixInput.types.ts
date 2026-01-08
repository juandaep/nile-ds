
export type SuffixInputProps = {
  id?: string
  name?: string
  suffix: string
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
