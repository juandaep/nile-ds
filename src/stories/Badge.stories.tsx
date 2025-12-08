// src/stories/Badge.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge, { type BadgeColor, type BadgeType } from "../components/Badge/Badge"; 
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification01Icon } from "@hugeicons/core-free-icons";

const allColors: BadgeColor[] = ['Red', 'Green', 'Blue', 'Grey', 'White', 'Black'];
const allTypes: BadgeType[] = ['Dot', 'Number', 'Text'];

const meta = {
  title: "Nile Component/Badge",
  component: Badge,
  parameters: { layout: "centered",
    controls: {
        exclude: ['children','position']
    }
   },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: allTypes },
    color: { control: "select", options: allColors },
    value: { 
      control: "text", 
      description: "Default values: '2' for Number, 'New' for Text. Not applicable for Dot type.",
      if: { arg: 'type', neq: 'Dot' } 
    },
    children: { control: "object" },
    position: { control: "select", options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'], if: { arg: 'children' } }
  },
  args: {
      type: 'Number',
      color: 'Red',
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const BellIcon = (
    <HugeiconsIcon icon={Notification01Icon} />
);


export const NumberDefault: Story = {
  // Args tidak perlu value karena type: Number (default) akan memicu value: '2' di komponen
  args: { color: "Red" },
  name: "Number Min Value",
};

export const NumberCustom: Story = {
  args: { color: "Black", value: '99+' }, 
  name: "Number Max Value",
};

export const Dot: Story = {
  args: { type: "Dot", color: "Blue" }, 
};

export const TextDefault: Story = {
  // 💡 PERBAIKAN: Hapus value: "New" di sini. 
  // Biarkan komponen mengambil default 'New' saat type: "Text" dipilih.
  args: { type: "Text", color: "Green" }, 
  name: "Text",
};

export const IconNotification: Story = {
  args: {
    type: 'Number',
    color: 'Red',
    children: BellIcon,
    position: 'top-right'
  },
  name: 'Notification Badge on Icon',
};