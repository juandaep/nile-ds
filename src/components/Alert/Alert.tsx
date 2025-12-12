import React from "react";

import {
  AlertCircleIcon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import "./alert.css";
import { HugeiconsIcon } from "@hugeicons/react";
import type { AlertProps } from "./Alert.types";

function renderIcon(variant: AlertVariant, size = 20) {
  const iconData =
    {
      info: InformationCircleIcon,
      success: CheckmarkCircle02Icon,
      warning: AlertCircleIcon,
      danger: CancelCircleIcon,
    }[variant] || InformationCircleIcon;
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
  );
}

export type AlertVariant = "info" | "success" | "warning" | "danger";

export const Alert = ({
  variant = "info",
  children,
  dismissible = false,
  onClose,
}: AlertProps) => {
  const [visible, setVisible] = React.useState(true);
  const classes = ["nile-alert", `nile-alert--${variant}`]
    .filter(Boolean)
    .join(" ");

  function handleClose() {
    setVisible(false);
    if (onClose) onClose();
  }

  if (!visible) {
    if (!dismissible) return null;
    return (
      <div className="nile-alert__show">
        <button
          type="button"
          className="nile-alert__show-button"
          onClick={() => setVisible(true)}
        >
          Show alert
        </button>
      </div>
    );
  }

  return (
    <div role="alert" className={classes}>
      <div className="nile-alert__content">
        <span className="nile-alert__icon">{renderIcon(variant, 20)}</span>
        {children ? <div className="nile-alert__body">{children}</div> : null}
      </div>
      {dismissible ? (
        <span
          role="button"
          tabIndex={0}
          className="nile-alert__close"
          aria-label="Close alert"
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClose();
            }
          }}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={20} />
        </span>
      ) : null}
    </div>
  );
};

export default Alert;
