export type CircularProgressSize = "sm" | "md" | "lg" | "xl"
export type CircularProgressColorScheme = "Default" | "Inverse"

export interface CircularProgressProps {
  size?: CircularProgressSize
  colorScheme?: CircularProgressColorScheme
  className?: string
}
