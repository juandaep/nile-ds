import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { fn } from "storybook/test"
import Select from "../components/Input/Select/Select"
import type { SelectOption } from "../components/Input/Select/Select.types"

const sampleOptions: SelectOption[] = [
  { value: "Item 1", label: "Item 1" },
  { value: "Item 2", label: "Item 2" },
  { value: "Item 3", label: "Item 3" },
  { value: "Item 4", label: "Item 4" },
]

const meta: Meta<typeof Select> = {
  title: "Nile Components/Input/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Select Field is used to choose one option from a predefined list. It supports both standard selection and searchable selection modes, with optional clear functionality and leading icons.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      table: { category: "Fn" },
      description: "Optional id for the select element",
    },
    name: {
      control: "text",
      table: { category: "Fn" },
      description: "Optional name for the select element",
    },
    options: {
      table: { category: "Data" },
      description: "Array of options to display in the select dropdown",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
    },
    mode: {
      control: { type: "select" },
      options: ["Select Only", "Searchable"],
      description: "Select mode: standard or searchable",
    },
    clearable: {
      control: "boolean",
      if: { arg: "mode", eq: "type" },
      description: "Show clear button when value is present",
    },
    showLeadIcon: {
      control: "boolean",
      description: "Show leading icon in the select field",
    },
    disabled: { control: "boolean", description: "Disabled state" },
    error: {
      control: "boolean",
      if: { arg: "disabled", eq: false },
      description: "Error visual state",
    },
    onChange: {
      table: { category: "Fn" },
      description: "Callback when the selected value changes",
    },
    value: {
      table: { category: "Fn" },
      description: "Controlled selected value",
    },
    defaultValue: {
      table: { category: "Fn" },
      description: "Uncontrolled default selected value",
    },
    leadIcon: {
      table: { category: "Appearance" },
      description: "Custom leading icon element",
    },
    className: {
      table: { category: "Appearance" },
      description: "Custom class name for styling",
    },
  },
  args: {
    options: sampleOptions,
    placeholder: "Placeholder",
    mode: "Select Only",
    clearable: true,
    showLeadIcon: false,
    disabled: false,
    error: false,
    onChange: fn(),
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "1. Default",
}

export const Typeable: Story = {
  name: "2. Typeable",
  args: { mode: "Searchable", placeholder: "Search" },
}

export const WithLeadIcon: Story = {
  name: "3. With Lead Icon",
  args: { showLeadIcon: true },
}

export const ClearableInteractive: Story = {
  name: "4. Clearable (interactive)",
  render: (args) => {
    const [val, setVal] = useState("")
    return (
      <Select
        {...args}
        mode="Searchable"
        clearable
        value={val}
        onChange={(v: string) => setVal(v)}
      />
    )
  },
}

export const Disabled: Story = {
  name: "5. Disabled",
  args: { disabled: true },
  argTypes: { error: { table: { disable: true }, control: { disable: true } } },
}

export const Error: Story = {
  name: "6. Error",
  render: (args) => {
    const [val, setVal] = useState("[]")
    return (
      <Select
        {...args}
        mode="Searchable"
        clearable
        error
        value={val}
        onChange={(v: string) => setVal(v)}
      />
    )
  },
}
