import "./badge.css";
import type { BadgeProps, BadgeType, BadgeValue } from "./Badge.type";

export const Badge = ({
  type,
  color,
  value,
  children,
  position = "top-right",
}: BadgeProps) => {
  const defaultValues: Record<BadgeType, BadgeValue> = {
    Number: 2,
    Text: "New",
    Dot: "",
  };

  const displayValue =
    type !== "Dot" && value === undefined ? defaultValues[type] : value;

  const badgeClassName = `nile-badge nile-badge--${color.toLowerCase()} nile-badge--${type
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  const renderContent = () => {
    switch (type) {
      case "Dot":
        return null;
      case "Number":
      case "Text":
        return <span>{displayValue}</span>;
      default:
        return null;
    }
  };

  if (children) {
    const wrapperClassName = `nile-badge__wrapper nile-badge__wrapper--${position}`;

    return (
      <div className="nile-badge__container-wrapped">
        {children}
        <div className={wrapperClassName}>
          <div className={badgeClassName}>{renderContent()}</div>
        </div>
      </div>
    );
  }

  return <div className={badgeClassName}>{renderContent()}</div>;
};

export default Badge;
