import React from "react";
import "./avatar.css";
// Menggunakan 'import type' untuk type dari file terpisah
import type { AvatarProps, AvatarSize } from "./Avatar.types";
import { HugeiconsIcon } from "@hugeicons/react";
import { BankFreeIcons, ImageNotFound01Icon } from "@hugeicons/core-free-icons";

// --- Utility Functions ---

/** Get the pixel size for the icon inside the avatar based on the overall size. */
const getIconSize = (size: AvatarSize): number => {
  const sizeMap: Record<AvatarSize, number> = {
    sm: 16,
    md: 20,
    lg: 24,
  };
  return sizeMap[size];
};

/** Get the pixel size for the container, useful for CSS variables in multiple avatar type. */
const getContainerSizePx = (size: AvatarSize): number => {
  switch (size) {
    case "sm":
      return 32;
    case "md":
      return 40;
    case "lg":
      return 48;
    default:
      return 40;
  }
};

// --- Constant Maps ---

const containerSizeMap: Record<AvatarSize, string> = {
  sm: "sizeSm",
  md: "sizeMd",
  lg: "sizeLg",
};
const textSizeMap: Record<AvatarSize, string> = {
  sm: "textSm",
  md: "textMd",
  lg: "textLg",
};
const typeClassMap: Record<string, string> = {
  profile: "typeProfile",
  text: "typeText",
  "icon-filled": "typeIcon-filled",
  "icon-outlined": "typeIcon-outlined",
};

// --- Sub-Components (Type Inline) ---

interface IconPlaceholderProps extends Pick<AvatarProps, "type" | "size"> {
  iconElement: React.ReactNode;
}

// IconPlaceholder (Type Inline)
const IconPlaceholder = ({ type, iconElement }: IconPlaceholderProps) => {
  // ✅ Type Inline

  const isOutlined = type === "icon-outlined";
  const style = isOutlined
    ? { color: "var(--colors__icon__iconprominent)", display: "flex" }
    : { display: "flex" };

  return <div style={style}>{iconElement}</div>;
};

interface AvatarChildProps {
  size: AvatarSize;
  iconElement: React.ReactNode;
  className: string;
}

// AvatarChild (Type Inline)
const AvatarChild = ({
  // ✅ Type Inline
  size,
  iconElement,
  className,
}: AvatarChildProps) => {
  const containerClass = `nile-avatar ${containerSizeMap[size]} ${typeClassMap["icon-outlined"]} ${className}`;

  return (
    <div className={containerClass}>
      <IconPlaceholder
        type="icon-outlined"
        size={size}
        iconElement={iconElement}
      />
    </div>
  );
};

interface AvatarMultipleProps extends Pick<AvatarProps, "size"> {
  iconElement: React.ReactNode;
}

// AvatarMultiple (Type Inline)
const AvatarMultiple = ({ size, iconElement }: AvatarMultipleProps) => {
  // ✅ Type Inline
  const avatarWidth = getContainerSizePx(size);

  /** This container wraps multiple AvatarChild components to achieve the stacked/multiple effect.
   * The width calculation is crucial for correct overlap. */
  return (
    <div
      className={`typeIcon-multiple-wrapper ${containerSizeMap[size]}`}
      style={
        {
          "--avatar-multiple-height": `${avatarWidth}px`,
        } as React.CSSProperties
      }
    >
      <AvatarChild
        size={size}
        iconElement={iconElement}
        className="nile-avatar-child-1"
      />
      <AvatarChild
        size={size}
        iconElement={iconElement}
        className="nile-avatar-child-2"
      />
      <AvatarChild
        size={size}
        iconElement={iconElement}
        className="nile-avatar-child-3"
      />
    </div>
  );
};

// --- Main Component ---

// Avatar (Type Inline)
export const Avatar = ({
  // ✅ Type Inline
  type,
  size,
  text = "KP",
  photoUrl,
  icon,
}: AvatarProps) => {
  const iconSize = getIconSize(size);
  const DefaultIconElement = (
    <HugeiconsIcon icon={BankFreeIcons} size={iconSize} />
  );
  const iconElement = icon || DefaultIconElement;

  if (type === "icon-multiple") {
    return <AvatarMultiple size={size} iconElement={iconElement} />;
  }

  let contentClass = typeClassMap[type];

  const renderContent = () => {
    switch (type) {
      case "profile":
        if (photoUrl) {
          return <img src={photoUrl} alt="Profile" className="photo" />;
        } else {
          contentClass = typeClassMap["icon-outlined"];

          return (
            <HugeiconsIcon
              icon={ImageNotFound01Icon}
              size={iconSize}
              style={{ color: "var(--colors__icon__iconprominent)" }}
            />
          );
        }
      case "text":
        return <span className={textSizeMap[size]}>{text}</span>;
      case "icon-filled":
      case "icon-outlined":
        return (
          <IconPlaceholder type={type} size={size} iconElement={iconElement} />
        );
      default:
        return null;
    }
  };

  const containerClass = `nile-avatar ${containerSizeMap[size]} ${contentClass}`;

  return (
    <div className={containerClass}>{renderContent()}</div>
  );
};
