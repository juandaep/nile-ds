import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  type AccordionItemData,
} from "../components/Accordion/Accordion";
import { AccordionContent } from "../components/Accordion/AccordionContent";

const defaultItems: AccordionItemData[] = [
  {
    id: "1",
    title: "Accordion Title",
    subtext: "Accordion Subtitle",
    content: (
      <AccordionContent />
    ),
  },
  {
    id: "2",
    title: "Accordion Title",
    subtext: "Accordion Subtitle",
    content: (
      <AccordionContent />
    ),
  },
  {
    id: "3",
    title: "Accordion Title",
    subtext: "Accordion Subtitle",
    content: (
      <AccordionContent />
    ),
  },
];

// --- Metadata Storybook Components ---

const meta: Meta<typeof Accordion> = {
  title: "Nile Component/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    allowMultipleOpen: {
      description: "Enable a mode where multiple items can be opened.",
      control: "boolean",
    },
    items: { control: "object" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Stories ---

// Single Open Story
export const SingleOpen: Story = {
  args: {
    allowMultipleOpen: false,
    items: defaultItems,
  },
  render: (args) => (
    <Accordion
      {...args}
      key={args.allowMultipleOpen ? "multiple" : "single"}
    />
  ),
};

// Multiple Open Story
export const MultipleOpen: Story = {
  args: {
    allowMultipleOpen: true,
    items: defaultItems,
  },
  render: (args) => (
    <Accordion
      {...args}
      key={args.allowMultipleOpen ? "multiple" : "single"}
    />
  ),
};

// Custom Class Story
export const CustomClass: Story = {
  args: {
    items: defaultItems,
    className: "accordion-dark-theme",
  },
  render: (args) => (
    <Accordion {...args} key={args.allowMultipleOpen ? "multiple" : "single"} />
  ),
};
