// Breadcrumbs.tsx

import { ArrowLeft02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { BreadcrumbsProps } from "./Breadcrumbs.types"
import classes from "./breadcrumbs.module.css"

export const Breadcrumbs = ({
  items,
  separator = "/",
  showBackArrow = false,
  maxItems = 5,
}: BreadcrumbsProps) => {
  const isLongPath = items.length > maxItems

  let visibleItems = items
  if (isLongPath) {
    const firstItem = items[0]
    const lastItem = items[items.length - 1]
    visibleItems = [firstItem, { label: "...", href: "" }, lastItem]
  }

  return (
    <ol className={classes.list} aria-label="Breadcrumb">
      {visibleItems.map((item, index) => {
        const isLast = index === visibleItems.length - 1
        const isElipsis = item.label === "..."
        const isFirst = index === 0

        if (isElipsis) {
          return (
            <li key={index} className={classes.item}>
              <span className={classes.elipsis}>{item.label}</span>
              <span aria-hidden="true" className={classes.separator}>
                {separator}
              </span>
            </li>
          )
        }

        return (
          <li key={item.href + index} className={classes.item}>
            <a
              className={classes.link}
              href={item.href}
              aria-current={isLast ? "page" : undefined}
            >
              {isFirst && showBackArrow && (
                <span aria-hidden="true" className={classes.arrowBack}>
                  <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
                </span>
              )}

              <span className={isLast ? classes.lastLink : ""}>
                {item.label}
              </span>
            </a>

            {!isLast && (
              <span aria-hidden="true" className={classes.separator}>
                {separator}
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
