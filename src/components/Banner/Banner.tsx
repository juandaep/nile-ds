import React from "react";
import {
  AlertCircleIcon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";
import "./banner.css";
import Button from "../Button/Button";
import type { BannerProps, BannerVariant } from "./Banner.types";

function renderIcon(variant: BannerVariant, size = 20) {
  const iconData =
    {
      info: InformationCircleIcon,
      success: CheckmarkCircle02Icon,
      warning: AlertCircleIcon,
      error: CancelCircleIcon,
      general: InformationCircleIcon,
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
      {Array.isArray(iconData) &&
        iconData.map(([tag, attrs], i) =>
          React.createElement(tag, { ...attrs, key: i })
        )}
    </svg>
  );
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
  const [visible, setVisible] = React.useState(true);

  const classes = [
    "nile-banner",
    `nile-banner--${variant}`,
    `nile-banner--${designType || "outlined"}`,
  ]
    .filter(Boolean)
    .join(" ");

  function handleDismiss() {
    setVisible(false);
    if (onCancel) onCancel();
  }

  function handleRestore() {
    setVisible(true);
  }

  if (!visible) {
    if (!dismissible) return null;
    return (
      <button
        type="button"
        className="nile-banner__show-button"
        onClick={handleRestore}
      >
        Show Banner
      </button>
    );
  }

  return (
    <div role="alert" className={classes}>
      <div className="nile-banner__content">
        {variant !== "general" && (
          <span className="nile-banner__icon">{renderIcon(variant, 20)}</span>
        )}

        <div className="nile-banner__body">
          {title && (
            <h3 className={`nile-banner__title nile-banner__title--${variant}`}>
              {title}
            </h3>
          )}
          {children && <div className="nile-banner__subtitle">{children}</div>}
        </div>
      </div>

      <div className="nile-banner__trailing-actions">
        {showTrailButton && (
          <Button
            size="sm"
            variant="tertiary"
            text="Upgrade"
            onClick={onTrailButton}
          />
        )}
        {dismissible ? (
          <span
            role="button"
            tabIndex={0}
            className="nile-banner__close"
            aria-label="Close banner"
            onClick={handleDismiss}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleDismiss();
              }
            }}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </span>
        ) : null}
      </div>

      {showFooterButtons && (
        <div className="nile-banner__footer">
          <Button
            size="sm"
            variant="ghost"
            text="Cancel"
            onClick={handleDismiss}
          />
          <Button
            size="sm"
            variant="primary"
            text="Try Again"
            onClick={onTryAgain}
          />
        </div>
      )}
    </div>
  );
};

export default Banner;
