import { CancelCircleIcon, Mail01Icon, PercentIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import React, { useEffect, useState } from "react"
import classes from "./textfield.module.css"
import type { TextFieldProps } from "./TextField.types"

export const TextField = ({
  id,
  name,
  placeholder = "",
  value,
  defaultValue,
  onChange,
  disabled = false,
  error = false,
  state,
  showLeadIcon = false,
  showTrailIcon = false,
  leadIcon,
  trailIcon,
  clearable = false,
  charType,
  className = "",
}: TextFieldProps) => {
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

  // sanitize according to charType
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
        // keep only non-alphanumeric characters (including spaces and punctuation)
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
    // keep the DOM value in sync for immediate feedback
    if (sanitized !== raw && inputRef.current) {
      inputRef.current.value = sanitized
    }
    handleChange(sanitized)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!charType) return
    if (e.ctrlKey || e.metaKey || e.altKey) return
    const key = e.key
    // allow control keys (Backspace, Delete, Arrow keys, Tab)
    if (key.length !== 1) return
    const ok = ((): boolean => {
      if (charType === "Numeric") return /[0-9]/.test(key)
      if (charType === "Alpha") return /[a-zA-Z]/.test(key)
      if (charType === "Alphanumeric") return /[a-zA-Z0-9]/.test(key)
      if (charType === "Symbol") return /[^a-zA-Z0-9]/.test(key)
      if (charType === "All") return true
      return true
    })()
    if (!ok) e.preventDefault()
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (!charType) return
    e.preventDefault()
    const paste = e.clipboardData.getData("text")
    const sanitized = sanitizeValue(paste)
    const el = inputRef.current
    if (!el) return
    const start = el.selectionStart ?? el.value.length
    const end = el.selectionEnd ?? start
    const next = el.value.slice(0, start) + sanitized + el.value.slice(end)
    const final = sanitizeValue(next)
    el.value = final
    handleChange(final)
    const pos = start + sanitized.length
    el.setSelectionRange(pos, pos)
  }

  const handleClear = () => {
    if (disabled || state === "disabled") return
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current.focus()
    }
    if (!isControlled) setInternalValue("")
    onChange && onChange("")
  }

  const lead = leadIcon ?? (showLeadIcon ? <HugeiconsIcon icon={Mail01Icon} size={20} /> : null)
  const trail = trailIcon ?? (showTrailIcon ? <HugeiconsIcon icon={PercentIcon} size={20} /> : null)

  const forcedDisabled = disabled || state === "disabled"
  const isFocused = state === "focused" || focused
  const effectiveError = error && !forcedDisabled

  const wrapperClass = [
    classes.wrapper,
    isFocused ? classes.focused : "",
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

      <div className={wrapperClass} aria-disabled={forcedDisabled} data-variant={charType} onClick={handleWrapperClick}>
      {lead ? <div className={classes.leadingIcon}>{lead}</div> : null}
        <input
          ref={inputRef}
          id={id}
          name={name}
          className={classes.input}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={forcedDisabled}
          type={charType}
          aria-invalid={effectiveError}
          tabIndex={forcedDisabled ? -1 : 0}
          data-testid="textfield-input"
        />

      {clearable && currentValue ? (
        <button
          className={classes.clearButton}
          type="button"
          onClick={handleClear}
          aria-label="Clear"
          data-testid="textfield-clear"
          disabled={forcedDisabled}
          aria-disabled={forcedDisabled}
        >
          <HugeiconsIcon icon={CancelCircleIcon} size={20} />
        </button>
      ) : null}

      {trail ? <div className={classes.trailingIcon} data-testid="textfield-trail">{trail}</div> : null}
      </div>
  )
}

export default TextField
