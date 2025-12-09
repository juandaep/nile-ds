import type { Meta, StoryObj } from "@storybook/react";
import Banner from "../components/Banner/Banner";

const meta: Meta<typeof Banner> = {
  title: "Nile Component/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error", "general"],
      description: "Status warna dan ikon banner.",
    },
    designType: {
      control: "select",
      options: ["outlined", "side-border"],
      description: "Gaya visual banner. Default: outlined.",
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
    onCancel: { action: "Canceled/Dismissed" },
    onTryAgain: { action: "Try Again Clicked" },
    onTrailButton: { action: "Upgrade Clicked" },
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
};
