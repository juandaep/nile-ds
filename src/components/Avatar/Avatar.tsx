import { BankFreeIcons, ImageNotFound01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import React from "react"
import classes from "./avatar.module.css"
import type {
  AvatarChildProps,
  AvatarMultipleProps,
  AvatarProps,
  AvatarSize,
  IconPlaceholderProps,
} from "./Avatar.types"

const getIconSize = (size: AvatarSize): number => {
  const sizeMap: Record<AvatarSize, number> = {
    sm: 16,
    md: 20,
    lg: 24,
  }
  return sizeMap[size]
}

const getContainerSizePx = (size: AvatarSize): number => {
  switch (size) {
    case "sm":
      return 32
    case "md":
      return 40
    case "lg":
      return 48
    default:
      return 40
  }
}

const containerSizeMap: Record<AvatarSize, string> = {
  sm: classes.sizeSm,
  md: classes.sizeMd,
  lg: classes.sizeLg,
}

const textSizeMap: Record<AvatarSize, string> = {
  sm: classes.textSm,
  md: classes.textMd,
  lg: classes.textLg,
}
const typeClassMap: Record<string, string> = {
  Profile: classes.Profile,
  Initial: classes.Initial,
  "icon-filled": classes.filled,
  "icon-outlined": classes.outlined,
}

const IconPlaceholder = ({ iconElement }: IconPlaceholderProps) => {
  return <>{iconElement}</>
}

const AvatarChild = ({ size, iconElement, childIndex }: AvatarChildProps) => {
  const childClass = classes[`child${childIndex}` as keyof typeof classes]
  const containerClass = `${classes.avatar} ${containerSizeMap[size]} ${classes.outlined} ${childClass}`

  return (
    <div className={containerClass}>
      <IconPlaceholder
        type="icon-outlined"
        size={size}
        iconElement={iconElement}
      />
    </div>
  )
}

const AvatarMultiple = ({ size, iconElement }: AvatarMultipleProps) => {
  const avatarWidth = getContainerSizePx(size)
  const wrapperClass = `${classes.multipleWrapper} ${containerSizeMap[size]}`
  return (
    <div
      className={wrapperClass}
      style={
        {
          "--avatar-multiple-height": `${avatarWidth}px`,
        } as React.CSSProperties
      }
    >
      <AvatarChild size={size} iconElement={iconElement} childIndex={1} />
      <AvatarChild size={size} iconElement={iconElement} childIndex={2} />
      <AvatarChild size={size} iconElement={iconElement} childIndex={3} />
    </div>
  )
}

export const Avatar = ({
  type,
  size,
  initial = "KP",
  photoUrl,
  icon,
}: AvatarProps) => {
  const iconSize = getIconSize(size)
  const DefaultIconElement = (
    <HugeiconsIcon icon={BankFreeIcons} size={iconSize} />
  )
  const iconElement = icon || DefaultIconElement

  if (type === "icon-multiple") {
    return <AvatarMultiple size={size} iconElement={iconElement} />
  }

  let contentClass = typeClassMap[type]

  const renderContent = () => {
    switch (type) {
      case "Profile":
        if (photoUrl) {
          return <img src={photoUrl} alt="Profile" className={classes.photo} />
        } else {
          contentClass = classes.outlined

          return (
            <HugeiconsIcon
              icon={ImageNotFound01Icon}
              size={iconSize}
              style={{ color: "var(--colors__icon__iconprominent)" }}
            />
          )
        }
      case "Initial":
        return <span className={textSizeMap[size]}>{initial}</span>
      case "icon-filled":
      case "icon-outlined":
        return (
          <IconPlaceholder type={type} size={size} iconElement={iconElement} />
        )
      default:
        return null
    }
  }

  const containerClass = `${classes.avatar} ${containerSizeMap[size]} ${contentClass}`

  return <div className={containerClass}>{renderContent()}</div>
}
