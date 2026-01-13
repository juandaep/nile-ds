import { CancelCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import React, { useEffect, useState } from "react"
import classes from "./prefixinput.module.css"
import type { PrefixInputProps } from "./PrefixInput.types"

export const PrefixInput = ({
  id,
  name,
  placeholder = "",
  value,
  defaultValue,
  onChange,
  disabled = false,
  error = false,
  prefix,
  clearable = false,
  charType,
  className = "",
}: PrefixInputProps) => {
  const isControlled = typeof value !== "undefined"
  const [internalValue, setInternalValue] = useState<string>(defaultValue || "")
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (isControlled) return
    setInternalValue(defaultValue || "")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

  const currentValue = isControlled ? (value as string) : internalValue

  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const sanitizeValue = (s: string) => {
    if (!charType || charType === "All") return s
    switch (charType) {
      case "Numeric":
        return s.replace(/[^0-9]/g, "")
      case "Alpha":
        return s.replace(/[^a-zA-Z]/g, "")
      case "Alphanumeric":
        return s.replace(/[^a-zA-Z0-9]/g, "")
      case "Symbol":
        return s.replace(/[a-zA-Z0-9]/g, "")
      default:
        return s
    }
  }

  const handleChange = (next: string) => {
    const sanitized = sanitizeValue(next)
    if (!isControlled) setInternalValue(sanitized)
    onChange && onChange(sanitized)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const sanitized = sanitizeValue(raw)
    if (sanitized !== raw && inputRef.current) {
      inputRef.current.value = sanitized
    }
    handleChange(sanitized)
  }

  const handleClear = () => {
    if (disabled) return
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current.focus()
    }
    if (!isControlled) setInternalValue("")
    onChange && onChange("")
  }

  const forcedDisabled = disabled
  const effectiveError = error && !forcedDisabled

  const wrapperClass = [
    classes.wrapper,
    focused ? classes.focused : "",
    effectiveError ? classes.error : "",
    forcedDisabled ? classes.disabled : "",
    className,
  ].join(" ")

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (forcedDisabled) return
    const target = e.target as HTMLElement
    if (target.closest("button")) return
    inputRef.current?.focus()
  }

  return (
    <div className={wrapperClass} aria-disabled={forcedDisabled} onClick={handleWrapperClick}>
      <div className={classes.prefix} data-testid="prefixinput-prefix">{prefix}</div>
      <div className={[classes.control, effectiveError ? classes.error : ""].join(" ")} data-testid="prefixinput-control">
        <input
          ref={inputRef}
          id={id}
          name={name}
          className={classes.input}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={forcedDisabled}
          aria-invalid={effectiveError}
          tabIndex={forcedDisabled ? -1 : 0}
          data-testid="prefixinput-input"
        />

        {clearable && currentValue ? (
          <button
            className={classes.clearButton}
            type="button"
            onClick={handleClear}
            aria-label="Clear"
            data-testid="prefixinput-clear"
            disabled={forcedDisabled}
            aria-disabled={forcedDisabled}
          >
            <HugeiconsIcon icon={CancelCircleIcon} size={20} />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default PrefixInput
