import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import Alert from "../components/Alert/Alert";

const meta = {
  title: "Nile Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["info", "success", "warning", "danger"],
    },
    dismissible: { control: "boolean" },
  },
  args: { onClose: fn() },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: "info",
    // title: 'Information',
    children: "This is an informational alert to provide feedback to the user.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    // title: 'Success',
    children: "Everything worked as expected.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    // title: 'Warning',
    children: "Be careful — there might be unintended consequences.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    // title: 'Error',
    children: "Something went wrong. Please try again.",
  },
};

export const Dismissible: Story = {
  args: {
    variant: "info",
    // title: 'Dismissible',
    children:
      "This alert shows a close button. The `onClose` action will be called when clicked.",
    dismissible: true,
  },
};