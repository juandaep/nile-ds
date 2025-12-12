import type { Meta, StoryObj } from "@storybook/react";
import Banner from "../components/Banner/Banner";

const meta: Meta<typeof Banner> = {
  title: "Nile Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A banner displays a prominent message",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error", "general"],
      description: "Status color and banner icon",
    },
    designType: {
      control: "select",
      options: ["outlined", "side-border"],
      description: "Banner visual style. Default: outlined.",
    },
    title: { control: "text", description: "Banner title." },
    children: { control: "text", description: "Banner message." },
    dismissible: {
      control: "boolean",
      description:
        "If TRUE, the (x) button appears and the banner can be dismissed/restored.",
    },
    showFooterButtons: {
      control: "boolean",
      description: "Display buttons in the footer.",
    },
    showTrailButton: {
      control: "boolean",
      description: "Display trail button",
    },
    onCancel: {
      action: "Canceled/Dismissed",
      description:
        "Function called when the banner is dismissed via the close button or footer 'Cancel' button.",
      table: { category: "Fn" },
    },
    onTryAgain: {
      action: "Try Again Clicked",
      description:
        "Function called when the footer 'Try Again' button is clicked.",
      table: { category: "Fn" },
    },
    onTrailButton: {
      action: "Upgrade Clicked",
      description:
        "Function called when the trailing (e.g., 'Upgrade') button is clicked.",
      table: { category: "Fn" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

const defaultArgs = {
  title: "Banner Title",
  children: "Message is here to inform users.",
  dismissible: true,
  showFooterButtons: true,
  showTrailButton: false,
  onCancel: () => console.log("Cancel clicked"),
  onTryAgain: () => console.log("Try Again clicked"),
  onTrailButton: () => console.log("Upgrade clicked"),
};

export const InfoOutlined: Story = {
  args: {
    ...defaultArgs,
    variant: "info",
    designType: "outlined",
  },
  name: "1. Info - Outlined Default Actions",
};

export const SuccessSideBorderNoFooter: Story = {
  args: {
    ...defaultArgs,
    variant: "success",
    designType: "side-border",
    title: "Operation Successful",
    children: "All tasks have been completed without any issues.",
    showFooterButtons: false,
    showTrailButton: false,
  },
  name: "2. Success - Side Border Minimal",
};

export const ErrorWithUpgradeAndFooter: Story = {
  args: {
    ...defaultArgs,
    variant: "error",
    designType: "outlined",
    title: "Connection Error",
    children:
      "Failed to connect to the server. Please check your network and try again.",
    showTrailButton: true,
    showFooterButtons: true,
  },
  name: "3. Error - Full Interactive",
};

export const WarningPersistent: Story = {
  args: {
    ...defaultArgs,
    variant: "warning",
    designType: "side-border",
    title: "Session Expiring Soon",
    children: "Please save your work before logging out in 5 minutes.",
    dismissible: false,
    showTrailButton: false,
    showFooterButtons: false,
  },
  name: "4. Warning - Persistent/Non-Dismissible",
};

export const GeneralMinimal: Story = {
  args: {
    ...defaultArgs,
    variant: "general",
    designType: "outlined",
    title: "General Announcement",
    children: "This is a general announcement for all users.",
    dismissible: true,
    showTrailButton: false,
    showFooterButtons: false,
  },
  name: "5. General - Minimal Announcement",
};
