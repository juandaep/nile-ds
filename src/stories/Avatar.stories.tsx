import { HugeiconsIcon } from '@hugeicons/react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../components/Avatar/Avatar';
import { AlignVerticalCenterFreeIcons, BankFreeIcons, UserRoadsideIcon } from '@hugeicons/core-free-icons';

const DUMMY_PHOTO = "https://picsum.photos/48/48";
const getIconSize = (size: 'sm' | 'md' | 'lg') => {
    const map = { sm: 16, md: 20, lg: 24 };
    return map[size];
};

const meta: Meta<typeof Avatar> = {
  title: 'Nile Components/Avatar',
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', description: 'Avatar variants' },
    size: { control: 'radio', description: 'Avatar size'
     },
    text: { control: 'text', description:'Initial or displayed text (only valid when type="text")' },
    photoUrl: { control: 'text', description: 'Profile photo URL (only valid when type="profile)' },
    icon: { control: false, description: 'Custom icon component (ReactNode) to display. Default: Bank Icon.' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const ProfileWithPhoto: Story = {
  args: {
    type: 'profile',
    size: 'md',
    photoUrl: DUMMY_PHOTO,
  },
};

export const ProfileFallback: Story = {
  args: {
    type: 'profile',
    size: 'md',
    photoUrl: undefined, 
  },
};

export const TextInitials: Story = {
  args: {
    type: 'text',
    size: 'md',
    text: 'JD',
  },
};

export const IconFilledDefault: Story = {
  args: {
    type: 'icon-filled',
    size: 'lg',
  },
};

export const IconOutlinedCustom: Story = {
  args: {
    type: 'icon-outlined',
    size: 'sm',
    icon: <HugeiconsIcon icon={AlignVerticalCenterFreeIcons} size={getIconSize('sm')} style={{ color: 'var(--colors__icon__iconprominent)' }} />,
  },
};

const CustomMultipleIcon = <HugeiconsIcon icon={UserRoadsideIcon} size={getIconSize('md')} />;

export const IconMultiple: Story = {
  args: {
    type: 'icon-multiple',
    size: 'md',
    icon: CustomMultipleIcon, 
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Avatar {...args} size="sm" icon={<HugeiconsIcon icon={BankFreeIcons} size={getIconSize('sm')} />} />
      <Avatar {...args} size="md" icon={<HugeiconsIcon icon={BankFreeIcons} size={getIconSize('md')} />} />
      <Avatar {...args} size="lg" icon={<HugeiconsIcon icon={BankFreeIcons} size={getIconSize('lg')} />} />
    </div>
  ),
};