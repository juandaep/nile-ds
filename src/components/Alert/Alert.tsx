import React, { useState } from "react"
import {
  AlertCircleIcon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { AlertProps, AlertVariant } from "./Alert.types"
import classes from "./alert.module.css"

function renderIcon(variant: AlertVariant, size = 20) {
  const iconData =
    {
      Info: InformationCircleIcon,
      Success: CheckmarkCircle02Icon,
      Warning: AlertCircleIcon,
      Danger: CancelCircleIcon,
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
      {iconData.map(([tag, attrs], i) =>
        React.createElement(tag, { ...attrs, key: i })
      )}
    </svg>
  )
}

export const Alert = ({
  variant = "Info",
  children,
  dismissible = false,
  onClose,
}: AlertProps) => {
  const [visible, setVisible] = useState(true)

  function handleClose() {
    setVisible(false)
    if (onClose) onClose()
  }

  if (!visible) {
    if (!dismissible) return null
    return (
      <div className={classes.show}>
        <button
          type="button"
          className={classes.showButton}
          onClick={() => setVisible(true)}
        >
          Show alert
        </button>
      </div>
    )
  }

  return (
    <div role="alert" className={`${classes.alert} ${classes[variant]}`}>
      <div className={classes.content}>
        <span className={classes.icon}>{renderIcon(variant, 20)}</span>
        {children ? <div className={classes.body}>{children}</div> : null}
      </div>
      {dismissible ? (
        <span
          role="button"
          tabIndex={0}
          className={classes.close}
          aria-label="Close alert"
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleClose()
            }
          }}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={20} />
        </span>
      ) : null}
    </div>
  )
}

export default Alert
