import type { ReactNode } from "react"

export interface BreadcrumbsItem {
    label: string
    href: string
}

export interface BreadcrumbsProps {
    items: BreadcrumbsItem[]
    separator?: ReactNode
    showBackArrow?: boolean
    maxItems?: number
}