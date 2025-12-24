import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import Alert from "../components/Alert/Alert"

const meta = {
  title: "Nile Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Alert informs users about important events.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["info", "success", "warning", "danger"],
      description:
        "Visual variant (color and icon) corresponding to the status.",
    },
    dismissible: {
      control: "boolean",
      description:
        "If TRUE, displays a close button that allows the user to dismiss the alert.",
    },
    onClose: {
      action: "Alert Dismissed",
      description:
        "Callback function triggered when the close button is clicked.",
      table: { category: "Fn" },
    },
  },
  args: { onClose: fn() },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    variant: "info",
    children: "This is an informational alert to provide feedback to the user.",
    dismissible: false,
  },
  name: "1. Info Alert (Non-Dismissible)",
}

export const Success: Story = {
  args: {
    variant: "success",
    children: "Everything worked as expected.",
    dismissible: true,
  },
  name: "2. Success Alert",
}

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Be careful — there might be unintended consequences.",
    dismissible: true,
  },
  name: "3. Warning Alert",
}

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Something went wrong. Please try again.",
    dismissible: true,
  },
  name: "4. Danger Alert",
}

export const Dismissible: Story = {
  args: {
    variant: "info",
    children:
      "This alert shows a close button. The `onClose` action will be called when clicked.",
    dismissible: true,
  },
  name: "5. Dismissible Alert Example",
}