import React from "react"
import {
  AlertCircleIcon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { BannerProps, BannerVariant } from "./Banner.types"
import Button from "../Button/Button"
import classes from "./banner.module.css"

function renderIcon(variant: BannerVariant, size = 20) {
  const iconData =
    {
      info: InformationCircleIcon,
      success: CheckmarkCircle02Icon,
      warning: AlertCircleIcon,
      error: CancelCircleIcon,
      general: InformationCircleIcon,
    }[variant] || InformationCircleIcon
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
      {Array.isArray(iconData) &&
        iconData.map(([tag, attrs], i) =>
          React.createElement(tag, { ...attrs, key: i })
        )}
    </svg>
  )
}

export const Banner = ({
  variant = "info",
  designType = "outlined",
  title,
  children,
  dismissible = false,
  showFooterButtons = true,
  showTrailButton = false,
  onCancel,
  onTryAgain,
  onTrailButton,
}: BannerProps) => {
  const [visible, setVisible] = React.useState(true)

  const designTypeKey = designType.replace(/-./g, (m) => m[1].toUpperCase())

  const bannerClasses = [
    classes.banner,
    classes[variant as keyof typeof classes],
    classes[designTypeKey as keyof typeof classes],
  ]
    .filter(Boolean)
    .join(" ")

  function handleDismiss() {
    setVisible(false)
    if (onCancel) onCancel()
  }

  function handleRestore() {
    setVisible(true)
  }

  if (!visible) {
    if (!dismissible) return null
    return (
      <button
        type="button"
        className={classes.showButton}
        onClick={handleRestore}
      >
        Show Banner
      </button>
    )
  }

  const titleClass = `${classes.title} ${
    classes[
      `title${
        variant.charAt(0).toUpperCase() + variant.slice(1)
      }` as keyof typeof classes
    ]
  }`

  return (
    <div role="alert" className={bannerClasses}>
      <div className={classes.content}>
        {variant !== "general" && (
          <span className={classes.icon}>{renderIcon(variant, 20)}</span>
        )}

        <div className={classes.body}>
          {title && <h3 className={titleClass}>{title}</h3>}
          {children && <div className={classes.subtitle}>{children}</div>}
        </div>
      </div>

      <div className={classes.trailingActions}>
        {showTrailButton && (
          <Button
            text="Upgrade"
            size="sm"
            variant="tertiary"
            onClick={onTrailButton}
          />
        )}
        {dismissible ? (
          <span
            role="button"
            tabIndex={0}
            className={classes.close}
            aria-label="Close banner"
            onClick={handleDismiss}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleDismiss()
              }
            }}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </span>
        ) : null}
      </div>

      {showFooterButtons && (
        <div className={classes.footer}>
          <Button
            text="Cancel"
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
          />
          <Button
            text="Try Again"
            size="sm"
            variant="primary"
            onClick={onTryAgain}
          />
        </div>
      )}
    </div>
  )
}

export default Banner