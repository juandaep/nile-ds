import type { BadgeProps, BadgeType, BadgeValue } from "./Badge.type"
import classes from "./badge.module.css"

export const Badge = ({
  type = "Number",
  color = "Red",
  value,
  children,
  position = "top-right",
}: BadgeProps) => {
  const defaultValues: Record<BadgeType, BadgeValue> = {
    Number: 2,
    Text: "New",
    Dot: "",
  }

  const displayValue =
    type !== "Dot" && value === undefined ? defaultValues[type] : value

  const colorClass = classes[color.toLowerCase() as keyof typeof classes]
  const typeKey = type.toLowerCase()
  const typeClass = classes[typeKey as keyof typeof classes]

  const badgeClassName = `${classes.badge} ${colorClass} ${typeClass}`

  const renderContent = () => {
    switch (type) {
      case "Dot":
        return null
      case "Number":
      case "Text":
        return <span>{String(displayValue)}</span>
      default:
        return null
    }
  }

  if (children) {
    const positionKey = position.replace(/-./g, (match) =>
      match[1].toUpperCase()
    )
    const positionClass = classes[positionKey as keyof typeof classes]

    const wrapperClassName = `${classes.wrapper} ${positionClass}`

    return (
      <div className={classes.containerWrapped}>
        {children}
        <div className={wrapperClassName}>
          <div className={badgeClassName}>{renderContent()}</div>
        </div>
      </div>
    )
  }

  return <div className={badgeClassName}>{renderContent()}</div>
}

export default Badge
