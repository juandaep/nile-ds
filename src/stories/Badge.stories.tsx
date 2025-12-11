import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge, {
  type BadgeColor,
  type BadgeType,
} from "../components/Badge/Badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification01Icon } from "@hugeicons/core-free-icons";

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
  },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: allTypes },
    color: { control: "select", options: allColors },
    value: {
      control: "text",
      description:
        "Default values: '2' for Number, 'New' for Text. Not applicable for Dot type.",
      if: { arg: "type", neq: "Dot" },
    },
    children: { control: "object" },
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      if: { arg: "children" },
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
  name: "Number Min Value",
};

export const NumberCustom: Story = {
  args: { color: "Black", value: "99+" },
  name: "Number Max Value",
};

export const Dot: Story = {
  args: { type: "Dot", color: "Blue" },
};

export const TextDefault: Story = {
  args: { type: "Text", color: "Green" },
  name: "Text",
};

export const IconNotification: Story = {
  args: {
    type: "Number",
    color: "Red",
    children: BellIcon,
    position: "top-right",
  },
  name: "Notification Badge on Icon",
};
