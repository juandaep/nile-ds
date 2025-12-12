import type { ReactNode } from "react";

export type AccordionItemData = {
  id: string;
  title: string;
  subtext?: string;
  content: ReactNode;
};

export type OpenState = string | null | string[];

export interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
  allowMultipleOpen?: boolean;
}

export interface AccordionItemProps {
  id: string;
  title: string;
  subtext?: string;
  isOpen: boolean;
  onClick: (id: string) => void;
  children: ReactNode;
}