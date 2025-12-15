import {
  AlignVerticalCenterFreeIcons,
  BankIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../components/Avatar/Avatar";

const DUMMY_PHOTO = "https://picsum.photos/48/48";

const getIconSize = (size: "sm" | "md" | "lg") => {
  const map = { sm: 16, md: 20, lg: 24 };
  return map[size];
};

const meta: Meta<typeof Avatar> = {
  title: "Nile Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Avatars are user interface (UI) elements that display textual or visual content to represent a user's identity.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      description: "Avatar visual variants (e.g., photo, initials, icon).",
    },
    size: {
      control: "radio",
      description: "Defines the width and height of the avatar (sm, md, lg).",
    },
    text: {
      control: "text",
      description: 'Initials or displayed text (only valid when type="text").',
      if: { 
          arg: 'type', 
          eq: 'text'
        }
    },
    photoUrl: {
      control: "text",
      description: 'Profile photo URL (only valid when type="profile").',
      if: { 
          arg: 'type', 
          eq: 'profile'
        },
    },
    icon: {
      control: false,
      description:
        "Custom icon component (ReactNode) to display. Default: Bank Icon.",
      table: { category: "Fn" },
    },
  },

  args: {
    type: "initial",
    size: "md",
    text: "kp",
  }
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const ProfileWithPhoto: Story = {
  args: {
    type: "profile",
    size: "md",
    photoUrl: DUMMY_PHOTO,
  },
  name: "1. Profile with Photo",
};

export const ProfileFallback: Story = {
  args: {
    type: "profile",
    size: "md",
    photoUrl: undefined,
  },
  name: "2. Profile Fallback",
};

export const TextInitials: Story = {
  args: {
    type: "initial",
    size: "md",
    text: "JD",
  },
  name: "3. Text Initials",
};

export const IconFilledDefault: Story = {
  args: {
    type: "icon-filled",
    size: "lg",
  },
  name: "4. Icon Filled (Default)",
};

export const IconOutlinedCustom: Story = {
  args: {
    type: "icon-outlined",
    size: "sm",
    icon: (
      <HugeiconsIcon
        icon={AlignVerticalCenterFreeIcons}
        size={getIconSize("sm")}
        style={{ color: "var(--colors__icon__iconprominent)" }}
      />
    ),
  },
  name: "5. Icon Outlined (Custom)",
};

export const IconMultiple: Story = {
  args: {
    type: "icon-multiple",
    size: "md",
  },
  name: "6. Multiple Stacked Icons",
  render: (args) => (
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <Avatar
        {...args}
        size="sm"
        icon={<HugeiconsIcon icon={BankIcon} size={getIconSize("sm")} />}
      />
      <Avatar
        {...args}
        size="md"
        icon={<HugeiconsIcon icon={BankIcon} size={getIconSize("md")} />}
      />
      <Avatar
        {...args}
        size="lg"
        icon={<HugeiconsIcon icon={BankIcon} size={getIconSize("lg")} />}
      />
    </div>
  ),
};
