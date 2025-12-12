import type { Meta, StoryObj } from "@storybook/react-vite";
import type { BreadcrumbsProps } from "../components/Breadcrumbs/Breadcrumbs.types";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";

const longMockItems = [
  { label: "Dashboard", href: "/" },
  { label: "Settings", href: "/settings" },
  { label: "Users", href: "/settings/users" },
  { label: "Roles", href: "/settings/users/roles" },
  { label: "Designer", href: "/settings/users/roles/designer" },
  { label: "New Member", href: "/settings/users/roles/designer/new" },
  { label: "Profile", href: "/profile" },
];

const meta: Meta<BreadcrumbsProps> = {
  title: "Nile Components/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.",
      },
    },
  },
  args: {
    items: longMockItems,
    maxItems: 5,
    separator: "/",
  },
  argTypes: {
    showBackArrow: {
      control: "boolean",
      description: "Show/hide arrow back.",
    },
    separator: { control: "text" },
    maxItems: { control: "number" },
    items: { control: "object", table: { category: "Fn" } },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const DefaultPathWithElipsis: Story = {
  args: {
    showBackArrow: false,
  },
};
