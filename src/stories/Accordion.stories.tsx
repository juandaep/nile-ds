import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  type AccordionItemData,
} from "../components/Accordion/Accordion";
import { AccordionContent } from "../components/Accordion/AccordionContent";

// --- Data Sampel ---

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

// --- Metadata Komponen Storybook ---

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

/**
 * Story default: Mode Single Open (hanya satu item yang dapat dibuka).
 * Menggunakan render dan key untuk memastikan state direset saat prop allowMultipleOpen diubah.
 */
export const SingleOpen: Story = {
  args: {
    allowMultipleOpen: false,
    items: defaultItems,
  },
  render: (args) => (
    <Accordion
      {...args}
      // Key memastikan komponen di-reset saat mode berubah, mencegah error 'includes'
      key={args.allowMultipleOpen ? "multiple" : "single"}
    />
  ),
};

/**
 * Story ini menunjukkan mode Multiple Open.
 */
export const MultipleOpen: Story = {
  args: {
    allowMultipleOpen: true,
    items: defaultItems,
  },
  render: (args) => (
    <Accordion
      {...args}
      // Key memastikan komponen di-reset saat mode berubah
      key={args.allowMultipleOpen ? "multiple" : "single"}
    />
  ),
};

/**
 * Menunjukkan Akordeon dengan kelas kustom untuk styling.
 */
export const CustomClass: Story = {
  args: {
    items: defaultItems,
    className: "accordion-dark-theme",
  },
  render: (args) => (
    <Accordion {...args} key={args.allowMultipleOpen ? "multiple" : "single"} />
  ),
};
