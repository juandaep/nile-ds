import type { Meta, StoryObj } from "@storybook/react-vite"
import CircularProgress from "../components/CircularProgress/CircularProgress"

const meta: Meta<typeof CircularProgress> = {
  title: "Nile Components/Circular Progress",
  component: CircularProgress,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
      description: "size of the circular progress indicator",
    },
    colorScheme: {
      control: "radio",
      options: ["Default", "Inverse"],
      description: "Color scheme based on background context",
    },
    className: {
      control: "text",
    },
  },
  args: {
    size: "md",
    colorScheme: "Default",
  },
}

export default meta

type Story = StoryObj<typeof CircularProgress>

export const Variants: Story = {
  render: (args) => {
    const isInverse = args.colorScheme === "Inverse"
    
    return (
      <div 
        style={{ 
          padding: "40px", 
          backgroundColor: isInverse ? "#111" : "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "background-color 0.3s ease" 
        }}
      >
        <CircularProgress {...args} />
      </div>
    )
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", justifyContent: "center" }}>
      <CircularProgress {...args} size="sm" />
      <CircularProgress {...args} size="md" />
      <CircularProgress {...args} size="lg" />
      <CircularProgress {...args} size="xl" />
    </div>
  ),
}
