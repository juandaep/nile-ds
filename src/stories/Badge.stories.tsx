import type { Meta, StoryObj } from "@storybook/react-vite";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification01Icon } from "@hugeicons/core-free-icons";
import type { BadgeColor, BadgeType } from "../components/Badge/Badge.type";
import Badge from "../components/Badge/Badge";

const allColors: BadgeColor[] = [
  "Red",
  "Green",
  "Blue",
  "Grey",
  "White",
  "Black",
];
const allTypes: BadgeType[] = ["Dot", "Number", "Text"];

const meta = {
  title: "Nile Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    controls: {
      exclude: ["children", "position"],
    },
    docs: {
      description: {
        component:
          "Badges are used to inform the user of the status of specific data.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: allTypes,
      description:
        "Defines the badge content style: count, text label, or just a dot.",
    },
    color: {
      control: "select",
      options: allColors,
      description: "Defines the background color of the badge.",
    },
    value: {
      control: "text",
      description:
        "Default values: '2' for Number, 'New' for Text. Not applicable for Dot type.",
      if: { arg: "type", neq: "Dot" },
    },
    children: {
      control: "object",
      description:
        "The element the badge wraps and positions itself relative to.",
    },
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      if: { arg: "children" },
      description: "Position of the badge relative to the wrapped element.",
    },
  },
  args: {
    type: "Number",
    color: "Red",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const BellIcon = <HugeiconsIcon icon={Notification01Icon} />;

export const NumberDefault: Story = {
  args: { color: "Red" },
  name: "1. Number Default Value",
};

export const NumberCustom: Story = {
  args: { color: "Black", value: "99+" },
  name: "2. Number Max Value",
};

export const Dot: Story = {
  args: { type: "Dot", color: "Blue" },
  name: "3. Dot Indicator",
};

export const TextDefault: Story = {
  args: { type: "Text", color: "Green" },
  name: "4. Text Badge",
};

export const IconNotification: Story = {
  args: {
    type: "Number",
    color: "Red",
    children: BellIcon,
    position: "top-right",
  },
  name: "5. Notification Badge on Icon",
};
