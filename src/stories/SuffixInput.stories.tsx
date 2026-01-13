import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { fn } from "storybook/test"
import SuffixInput from "../components/Input/SuffixInput/SuffixInput"

const meta: Meta<typeof SuffixInput> = {
  title: "Nile Components/Input/Suffix Input",
  component: SuffixInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Suffix Input is a text input field that includes a non-editable suffix element, useful for denoting units or categories. It supports clear functionality and character type restrictions.",
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
    suffix: {
      control: "text",
      description: "Suffix text displayed after the input value",
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
    suffix: "%",
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

export const SuffixAndClearable: Story = {
  name: "3. Suffix + Clearable",
  render: (args) => {
    const [val, setVal] = useState("Kopra by Mandiri")
    return (
      <SuffixInput
        {...args}
        value={val}
        clearable
        onChange={(v: string) => setVal(v)}
      />
    )
  },
  args: { suffix: "%", clearable: true },
}

export const Disabled: Story = {
  name: "4. Disabled",
  args: { disabled: true, value: "Kopra by Mandiri" },
}

export const Error: Story = {
  name: "5. Error",
  args: { error: true, value: "Invalid value" },
}
