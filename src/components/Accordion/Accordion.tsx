import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";
import "./accordion.css";
import type { AccordionItemProps, AccordionProps, OpenState } from "./Accordion.types";

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  subtext,
  isOpen,
  onClick,
  children,
}) => {
  const toggleOpen = () => onClick(id);

  return (
    <div className={`nile-accordion-item ${isOpen ? "open" : ""}`}>
      <div
        className="nile-accordion-header"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <div className="nile-accordion-header-text">
          <div className="title">{title}</div>
          {subtext && <div className="subtext">{subtext}</div>}
        </div>
        <span className="accordion-icon">
          {isOpen ? (
            <HugeiconsIcon icon={ArrowUp01Icon} size={24} />
          ) : (
            <HugeiconsIcon icon={ArrowDown01Icon} size={24} />
          )}
        </span>
      </div>

      <div className="nile-accordion-content-wrapper">
        <div className="nile-accordion-content">{children}</div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  className = "",
  allowMultipleOpen = false,
}) => {
  const [openState, setOpenState] = useState<OpenState>(
    allowMultipleOpen ? [] : null
  );

  const handleItemClick = (id: string) => {
    if (allowMultipleOpen) {
      setOpenState((prevOpenState) => {
        const currentOpenIds = Array.isArray(prevOpenState)
          ? prevOpenState
          : [];

        if (currentOpenIds.includes(id)) {
          return currentOpenIds.filter((itemId) => itemId !== id);
        } else {
          return [...currentOpenIds, id];
        }
      });
    } else {
      setOpenState((prevOpenState) => {
        const currentOpenId = prevOpenState as string | null;
        return currentOpenId === id ? null : id;
      });
    }
  };

  return (
    <div className={`nile-accordion-container ${className}`}>
      {items.map((item) => {
        let isOpen = false;

        if (allowMultipleOpen) {
          const currentOpenIds = Array.isArray(openState) ? openState : [];
          isOpen = currentOpenIds.includes(item.id);
        } else {
          isOpen = openState === item.id;
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
        );
      })}
    </div>
  );
};
