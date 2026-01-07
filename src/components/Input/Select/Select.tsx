import { ArrowDown01Icon, CancelCircleIcon, Mail01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import classes from "./select.module.css"
import type { SelectProps } from "./Select.types"

export const Select = ({
  id,
  name,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "",
  mode = "Select Only",
  clearable = false,
  showLeadIcon = false,
  leadIcon,
  disabled = false,
  error = false,
  className = "",
}: SelectProps) => {
  const isControlled = typeof value !== "undefined"
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? "")
  const [isOpen, setIsOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [filter, setFilter] = useState("")

  const lead = leadIcon ?? (showLeadIcon ? <HugeiconsIcon icon={Mail01Icon} size={20} /> : null)

  const effectiveError = error && !disabled

  useEffect(() => {
    if (isControlled) return
    setInternalValue(defaultValue ?? "")
  }, [defaultValue, isControlled])

  const currentValue = isControlled ? (value as string) : internalValue

  useEffect(() => {
    if (mode === "Searchable") {
      setFilter(currentValue || "")
    }
  }, [currentValue, mode])

  const filteredOptions = useMemo(() => {
    if (mode === "Searchable" && filter) {
      const q = filter.toLowerCase()
      return options.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q))
    }
    return options
  }, [options, filter, mode])

  const inputRef = useRef<HTMLInputElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  // Portal for rendering options outside the component tree (prevents clipping in Storybook docs)
  const portalRef = useRef<HTMLDivElement | null>(null)
  const [optionsStyle, setOptionsStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(target)) {
        setIsOpen(false)
        setFocused(false)
      }
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [])

  // Create portal container on mount and clean up on unmount
  useEffect(() => {
    if (typeof document === "undefined") return
    const el = document.createElement("div")
    el.setAttribute("data-select-portal", "")
    document.body.appendChild(el)
    portalRef.current = el
    return () => {
      if (portalRef.current) {
        document.body.removeChild(portalRef.current)
        portalRef.current = null
      }
    }
  }, [])

  // Update options position when open, on resize/scroll, or when options change
  useEffect(() => {
    const updateOptionsPosition = () => {
      const wrap = wrapperRef.current
      const portal = portalRef.current
      if (!wrap || !portal) return
      const rect = wrap.getBoundingClientRect()
      setOptionsStyle({
        position: "absolute",
        top: `${rect.bottom + 8 + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        right: "auto",
      })
    }

    if (!isOpen) return

    // initial position
    updateOptionsPosition()

    const onScroll = () => updateOptionsPosition()
    const onResize = () => updateOptionsPosition()

    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", onResize)
    }
  }, [isOpen, /* filteredOptions length handled by options/filter/mode deps above */])

  const handleSelect = (val: string) => {
    if (disabled) return
    if (!isControlled) setInternalValue(val)
    onChange && onChange(val)
    setIsOpen(false)
    setFocused(false)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    if (disabled) return
    if (!isControlled) setInternalValue("")
    onChange && onChange("")
    setFilter("")
    if (inputRef.current) {
      inputRef.current.focus()
    } else {
      // keep focus on wrapper for select mode
      setFocused(true)
      setIsOpen(false)
    }
  }

  const displayLabel = options.find((o) => o.value === currentValue)?.label || ""

  const showClear = clearable && (!!currentValue || !!filter) && !disabled && (mode === "Searchable" || mode === "Select Only")

  const handleWrapperClick = () => {
    if (disabled) return
    if (mode === "Select Only") {
      setIsOpen((s) => {
        const next = !s
        setFocused(next)
        return next
      })
    } else {
      inputRef.current?.focus()
      setIsOpen(true)
      setFocused(true)
    }
  }

  const modeClass = mode === "Select Only" ? classes.modeSelect : classes.modeType

  return (
    <div
      ref={wrapperRef}
      className={[classes.wrapper, modeClass, focused ? classes.focused : "", effectiveError ? classes.error : "", disabled ? classes.disabled : "", className].join(" ")}
      onClick={handleWrapperClick}
      aria-disabled={disabled}
    >
      {showLeadIcon ? <div className={classes.leadingIcon}>{lead}</div> : null}

      {mode === "Searchable" ? (
        <input
          ref={inputRef}
          id={id}
          name={name}
          className={classes.input}
          placeholder={placeholder}
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
            setIsOpen(true)
            if (isControlled) {
              onChange && onChange(e.target.value)
            }
            if (!isControlled) {
              // don't set internalValue until user selects; keep filter separate
            }
          }}
          onFocus={() => {
            setFocused(true)
            setIsOpen(true)
          }}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          data-testid="select-input"
        />
      ) : (
        <div className={classes.display} data-testid="select-display">
          {displayLabel ? (
            <span>{displayLabel}</span>
          ) : (
            <span className={classes.placeholder}>{placeholder}</span>
          )}
        </div>
      )}

      {showClear ? (
        <button
          className={classes.clearButton}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleClear()
          }}
          aria-label="Clear"
          data-testid="select-clear"
        >
          <HugeiconsIcon icon={CancelCircleIcon} size={20} />
        </button>
      ) : null}

      <div className={classes.trailingIcon} aria-hidden>
        <HugeiconsIcon icon={ArrowDown01Icon} size={20} />
      </div>

      {isOpen ? (
        portalRef.current ? (
          createPortal(
            <div className={classes.options} role="listbox" data-testid="select-options" style={optionsStyle}>
              {filteredOptions.length ? (
                filteredOptions.map((o) => (
                  <div
                    key={o.value}
                    role="option"
                    className={classes.option}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelect(o.value)
                    }}
                    data-testid={`select-option-${o.value}`}
                  >
                    {o.label}
                  </div>
                ))
              ) : (
                <div className={classes.option} aria-disabled>
                  No options
                </div>
              )}
            </div>,
            portalRef.current
          )
        ) : (
          <div className={classes.options} role="listbox" data-testid="select-options">
            {filteredOptions.length ? (
              filteredOptions.map((o) => (
                <div
                  key={o.value}
                  role="option"
                  className={classes.option}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelect(o.value)
                  }}
                  data-testid={`select-option-${o.value}`}
                >
                  {o.label}
                </div>
              ))
            ) : (
              <div className={classes.option} aria-disabled>
                No options
              </div>
            )}
          </div>
        )
      ) : null}
    </div>
  )
}

export default Select
