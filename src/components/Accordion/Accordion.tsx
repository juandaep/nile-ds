import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"
import type { AccordionItemProps, AccordionProps, OpenState } from "./Accordion.types"
import classes from "./accordion.module.css"

const AccordionItem = ({
  id,
  title,
  subtext,
  isOpen,
  onClick,
  children,
}: AccordionItemProps) => {
  const toggleOpen = () => onClick(id)

  const accordiontItem = `${classes.item} ${isOpen ? classes.open : ""}`

  return (
    <div className={accordiontItem}>
      <div
        className={classes.header}
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <div className={classes.headerTextWrapper}>
          <div className={classes.title}>{title}</div>
          {subtext && <div className={classes.subtext}>{subtext}</div>}
        </div>
        <span className={classes.icon}>
          {isOpen ? (
            <HugeiconsIcon icon={ArrowUp01Icon} size={24} />
          ) : (
            <HugeiconsIcon icon={ArrowDown01Icon} size={24} />
          )}
        </span>
      </div>

      <div className={classes.contentWrapper}>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  )
}

export const Accordion = ({
  items,
  className = "",
  allowMultipleOpen = false,
}: AccordionProps) => {
  const [openState, setOpenState] = useState<OpenState>(
    allowMultipleOpen ? [] : null
  )

  const handleItemClick = (id: string) => {
    if (allowMultipleOpen) {
      setOpenState((prevOpenState) => {
        const currentOpenIds = Array.isArray(prevOpenState)
          ? prevOpenState
          : []

        if (currentOpenIds.includes(id)) {
          return currentOpenIds.filter((itemId) => itemId !== id)
        } else {
          return [...currentOpenIds, id]
        }
      })
    } else {
      setOpenState((prevOpenState) => {
        const currentOpenId = prevOpenState as string | null
        return currentOpenId === id ? null : id
      })
    }
  }

  const accordionContainer = `${classes.container} ${className}`

  return (
    <div className={accordionContainer}>
      {items.map((item) => {
        let isOpen = false

        if (allowMultipleOpen) {
          const currentOpenIds = Array.isArray(openState) ? openState : []
          isOpen = currentOpenIds.includes(item.id)
        } else {
          isOpen = openState === item.id
        }

        return (
          <AccordionItem
            key={item.id}
            id={item.id}
            title={item.title}
            subtext={item.subtext}
            isOpen={isOpen}
            onClick={handleItemClick}
          >
            {item.content}
          </AccordionItem>
        )
      })}
    </div>
  )
}