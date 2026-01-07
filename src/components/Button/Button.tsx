import {
  ArrowRightIcon,
  CheckmarkCircle02Icon,
  PrinterIcon,
} from "@hugeicons/core-free-icons"
import React from "react"
import type { ButtonProps } from "./Button.types"
import classes from "./button.module.css"

function renderIconDef(def: readonly any[], size = 16) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      {(def as readonly any[]).map(([tag, attrs]: any, i: number) =>
        React.createElement(tag, { ...attrs, key: i })
      )}
    </svg>
  )
}

const ICON_FOR_LEAD = PrinterIcon
const ICON_FOR_TRAIL = ArrowRightIcon || CheckmarkCircle02Icon

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "md",
      variant = "Primary",
      option = "Default",
      leadIcon = false,
      trailIcon = false,
      text,
      disabled,
      ...rest
    },
    ref
  ) => {
    const variantClass = classes[variant as keyof typeof classes]
    const sizeClass = classes[`size${size.toUpperCase()}` as keyof typeof classes]
    const normalizedOption = option.replace(/[-\s]/g, '')
    const optionClass = classes[`option${normalizedOption}` as keyof typeof classes]
    const classNames = [
      classes.button,
      variantClass,
      sizeClass,
      optionClass,
      disabled ? classes.isDisabled : "",
    ]
      .filter(Boolean)
      .join(" ")

    const iconSize = size === "sm" ? 16 : size === "md" ? 20 : 24

    const isIconOnly = option === "Icon Only"

    // If icon-only, render a single centered icon. Do not render lead/trail around text.
    if (isIconOnly) {
      const centerIcon =
        (leadIcon ? renderIconDef(ICON_FOR_LEAD, iconSize) : null) ??
        (trailIcon ? renderIconDef(ICON_FOR_TRAIL, iconSize) : null) ??
        renderIconDef(ICON_FOR_LEAD, iconSize)

      return (
        <button ref={ref} className={classNames} disabled={disabled} {...rest}>
          <span className={classes.icon}>{centerIcon}</span>
        </button>
      )
    }

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || option === "Loading"}
        aria-busy={option === "Loading" ? true : undefined}
        {...rest}
      >
        {/* Lead icon (only if not icon-only) */}
        {leadIcon && !isIconOnly ? (
          <span className={classes.lead}>
            {renderIconDef(ICON_FOR_LEAD, iconSize)}
          </span>
        ) : null}

        {/* Loading spinner or text */}
        {option === "Loading" ? (
          <span className={classes.spinner} aria-hidden />
        ) : (
          <span className={classes.text}>{text}</span>
        )}

        {/* Trail icon (only if not icon-only) */}
        {trailIcon && !isIconOnly ? (
          <span className={classes.trail}>
            {renderIconDef(ICON_FOR_TRAIL, iconSize)}
          </span>
        ) : null}
      </button>
    )
  }
)

export default Button
