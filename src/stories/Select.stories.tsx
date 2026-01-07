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
  },
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text", table: { category: "Fn" }},
    name: { control: "text", table: { category: "Fn" } },
    options: { table: { category: "Data" } },
    placeholder: { control: "text" },
    mode: { control: { type: "select" }, options: ["Select Only", "Searchable"] },
    clearable: { control: "boolean", if: { arg: "mode", eq: "type" } },
    showLeadIcon: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean", if: { arg: "disabled", eq: false } },
    onChange: { table: { category: "Fn" } },
    value: {table: { category: "Fn" }},
    defaultValue: {table: { category: "Fn" }},
    leadIcon: { table: { category: "Appearance" }},
    className: { table: { category: "Appearance" }},
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
      <div style={{ width: 360 }}>
        <Select
          {...args}
          mode="Searchable"
          clearable
          value={val}
          onChange={(v: string) => setVal(v)}
        />
      </div>
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
      <div style={{ width: 360 }}>
        <Select
          {...args}
          mode="Searchable"
          clearable
          error
          value={val}
          onChange={(v: string) => setVal(v)}
        />
      </div>
    )
  },
}
