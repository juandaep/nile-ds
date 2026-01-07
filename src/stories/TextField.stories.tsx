import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { fn } from "storybook/test"
import TextField from "../components/Input/TextField/TextField"

const meta: Meta<typeof TextField> = {
  title: "Nile Components/Input/Text Field",
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text fields allow users to input and edit text with optional lead/trail icons and an optional clear action.",
      },
    },
  },
  argTypes: {
    id: {
      control: "text",
      description: "Optional id for the input element",
      table: { category: "Fn" },
    },
    name: {
      control: "text",
      description: "Optional name for the input element",
      table: { category: "Fn" },
    },
    value: { control: "text", description: "Controlled value" },
    placeholder: { control: "text", description: "Placeholder text" },
    state: {
        control: fn,
      description: "Force visual state (default, focused, disabled)",
      table: { category: "Fn" },
    },
    showLeadIcon: { control: "boolean", description: "Show leading icon" },
    showTrailIcon: { control: "boolean", description: "Show trailing icon" },
    clearable: {
      control: "boolean",
      description: "Show clear button when value is present",
    },
    charType: {
      control: { type: "select" },
      options: ["alpha", "numeric", "alphanumeric", "symbol", "all"],
      description: "Restrict allowed character types",
    },
    disabled: { control: "boolean", description: "Disabled state" },
    error: {
      control: { type: "boolean" },
      description: "Error visual state",
      if: { arg: "disabled", eq: false },
    },
    leadIcon: { table: { category: "Appearance" } },
    trailIcon: { table: { category: "Appearance" } },
    defaultValue: { table: { category: "Fn" } },
    className: { table: { category: "Appearance" } },
    onChange: { table: { category: "Fn" } },
  },
  args: {
    onChange: fn(),
    placeholder: "Placeholder",
    showLeadIcon: false,
    showTrailIcon: false,
    clearable: false,
    disabled: false,
    error: false,
    charType: "all",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "1. Default",
  args: { placeholder: "Placeholder" },
}

export const Filled: Story = {
  name: "2. Filled",
  args: { value: "Kopra by Mandiri" },
}

export const Focused: Story = {
  name: "3. Focused",
  args: { state: "focused", showLeadIcon: true, placeholder: "Focused" },
}

export const Error: Story = {
  name: "4. Error",
  args: { error: true, value: "Invalid value" },
}

export const Disabled: Story = {
  name: "5. Disabled",
  args: { state: "disabled", value: "Kopra by Mandiri" },
  argTypes: { error: { table: { disable: true }, control: { disable: true } } },
}

export const WithLeadTrailIcons: Story = {
  name: "6. With Lead & Trail Icons",
  args: { showLeadIcon: true, showTrailIcon: true, value: "Kopra by Mandiri" },
}

export const Clearable: Story = {
  name: "7. Clearable (interactive)",
  render: (args) => {
    const [val, setVal] = useState("Kopra by Mandiri")
    return (
        <TextField {...args} value={val} onChange={(v: string) => setVal(v)} />
    )
  },
  args: { clearable: true },
}
