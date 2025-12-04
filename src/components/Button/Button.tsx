import {
  ArrowRightIcon,
  CheckmarkCircle02Icon,
  PrinterIcon
} from '@hugeicons/core-free-icons';
import React from 'react';
import './button.css';

export type ButtonSize = 'lg' | 'md' | 'sm';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type ButtonOption = 'default' | 'loading' | 'icon-only';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  option?: ButtonOption;
  leadIcon?: boolean;
  trailIcon?: boolean;
  children?: React.ReactNode;
}

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
  );
}

const ICON_FOR_LEAD = PrinterIcon;
const ICON_FOR_TRAIL = ArrowRightIcon || CheckmarkCircle02Icon;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      option = 'default',
      leadIcon = false,
      trailIcon = false,
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    const classNames = [
      'nile-btn',
      `nile-btn--${variant}`,
      `nile-btn--size-${size}`,
      `nile-btn--option-${option}`,
      disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;

    const isIconOnly = option === 'icon-only';

    // If icon-only, render a single centered icon. Do not render lead/trail around text.
    if (isIconOnly) {
      const centerIcon =
        (leadIcon ? renderIconDef(ICON_FOR_LEAD, iconSize) : null) ??
        (trailIcon ? renderIconDef(ICON_FOR_TRAIL, iconSize) : null) ??
        renderIconDef(ICON_FOR_LEAD, iconSize);

      return (
        <button
          ref={ref}
          className={classNames}
          disabled={disabled}
          {...rest}
        >
          <span className="nile-btn__icon-only">{centerIcon}</span>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || option === 'loading'}
        aria-busy={option === 'loading' ? true : undefined}
        {...rest}
      >
        {/* Lead icon (only if not icon-only) */}
        {leadIcon && !isIconOnly ? (
          <span className="nile-btn__lead">{renderIconDef(ICON_FOR_LEAD, iconSize)}</span>
        ) : null}

        {/* Loading spinner or text */}
        {option === 'loading' ? (
          <span className="nile-btn__spinner" aria-hidden />
        ) : (
          <span className="nile-btn__text">{children}</span>
        )}

        {/* Trail icon (only if not icon-only) */}
        {trailIcon && !isIconOnly ? (
          <span className="nile-btn__trail">{renderIconDef(ICON_FOR_TRAIL, iconSize)}</span>
        ) : null}
      </button>
    );
  }
);

export default Button;
