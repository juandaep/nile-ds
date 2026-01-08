import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { fn } from "storybook/test"
import PrefixInput from "../components/Input/PrefixInput/PrefixInput"

const meta: Meta<typeof PrefixInput> = {
  title: "Nile Components/Input/Prefix Input",
  component: PrefixInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Prefix Input is a text input field that includes a non-editable prefix element, useful for denoting units or categories. It supports clear functionality and character type restrictions.",
      },
    },
  },
  argTypes: {
    id: {
      control: "text",
      table: { category: "Fn" },
      description: "Optional id for the input element",
    },
    name: {
      control: "text",
      table: { category: "Fn" },
      description: "Optional name for the input element",
    },
    placeholder: { control: "text", description: "Placeholder text" },
    prefix: {
      control: "text",
      description: "Prefix text displayed before the input value",
    },
    clearable: {
      control: "boolean",
      description: "Show clear button when value is present",
    },
    value: { table: { category: "Fn" }, description: "Controlled value" },
    defaultValue: {
      table: { category: "Fn" },
      description: "Uncontrolled default value",
    },
    disabled: { control: "boolean", description: "Disabled state" },
    error: {
      control: "boolean",
      if: { arg: "disabled", eq: false },
      description: "Error visual state",
    },
    onChange: {
      table: { category: "Fn" },
      description: "Callback when the input value changes",
    },
    className: {
      table: { category: "Appearance" },
      description: "Custom class name for styling",
    },
    charType: {
      control: { type: "select" },
      options: ["Alpha", "Numeric", "Alphanumeric", "Symbol", "All"],
      description: "Restrict allowed character types",
    },
  },
  args: {
    onChange: fn(),
    prefix: "USD",
    placeholder: "Placeholder",
    clearable: false,
    disabled: false,
    error: false,
    charType: "All",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "1. Default",
}

export const Filled: Story = {
  name: "2. Filled",
  args: { value: "Kopra by Mandiri" },
}

export const PrefixAndClearable: Story = {
  name: "3. Prefix + Clearable",
  render: (args) => {
    const [val, setVal] = useState("Kopra by Mandiri")
    return (
      <PrefixInput
        {...args}
        value={val}
        clearable
        onChange={(v: string) => setVal(v)}
      />
    )
  },
  args: { prefix: "USD", clearable: true },
}

export const Disabled: Story = {
  name: "4. Disabled",
  args: { disabled: true, value: "Kopra by Mandiri" },
}

export const Error: Story = {
  name: "5. Error",
  args: { error: true, value: "Invalid value" },
}
