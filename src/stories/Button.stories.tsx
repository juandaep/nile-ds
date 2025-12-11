import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Button from '../components/Button/Button';

const meta: Meta<typeof Button> = {
  title: 'Nile Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm','md','lg'] },
    variant: { control: { type: 'select' }, options: ['primary','secondary','tertiary','ghost','danger'] },
    option: { control: { type: 'select' }, options: ['default','loading','icon-only'] },
    leadIcon: { control: 'boolean' },
    trailIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: { onClick: fn(), size: 'md', variant: 'primary', option: 'default', children: 'Button' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Primary', variant: 'primary', size: 'md' },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary', size: 'md' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
    </div>
  ),
};

export const IconOnly: Story = {
  args: { option: 'icon-only', leadIcon: true },
};

export const Loading: Story = {
  args: { option: 'loading', children: 'Loading' },
};
