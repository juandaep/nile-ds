import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import Button from "../components/Button/Button"

const meta: Meta<typeof Button> = {
  title: "Nile Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Buttons allow users to perform actions and choose with a single tap.",
      },
    },
  },

  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Defines the size of the button: small, medium, or large.",
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "ghost", "danger"],
      description:
        "Defines the visual style and hierarchy of the button (e.g., primary for main action, ghost for low-priority).",
    },
    option: {
      control: { type: "radio" },
      options: ["default", "loading", "icon-only"],
      description:
        "Defines special states of the button, such as displaying a loading spinner or showing only an icon.",
    },
    leadIcon: {
      control: "boolean",
      description: "If TRUE, displays a default icon before the text.",
      if: { 
          arg: 'option', 
          eq: 'default'
        }
      
    },
    trailIcon: {
      control: "boolean",
      description: "If TRUE, displays a default icon after the text.",
      if: { 
          arg: 'option', 
          eq: 'default'
        }
    },
    disabled: {
      control: "boolean",
      description:
        "If TRUE, the button is non-interactive and visually disabled.",
    },
    text: {
      control: "text",
      description: "The text label or content inside the button.",
    },
    onClick: {
      description: "Callback function triggered when the button is clicked.",
      table: { category: "Fn" },
    },
  },

  args: {
    onClick: fn(),
    size: "md",
    variant: "primary",
    option: "default",
    text: "Button",
    leadIcon: false,
    trailIcon: false,
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { text: "Primary", variant: "primary", size: "md" },
  name: "1. Primary Button",
}

export const Secondary: Story = {
  args: { text: "Secondary", variant: "secondary", size: "md" },
  name: "2. Secondary Button",
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button size="sm" text="Small" variant="primary" />
      <Button size="md" text="Medium" variant="primary" />
      <Button size="lg" text="Large" variant="primary" />
    </div>
  ),
  name: "3. Size Variations",
}

export const IconOnly: Story = {
  args: {
    option: "icon-only",
    leadIcon: true,
    text: "",
  },
  name: "4. Icon Only Button",
}

export const Loading: Story = {
  args: { option: "loading", text: "Loading" },
  name: "5. Loading State",
}