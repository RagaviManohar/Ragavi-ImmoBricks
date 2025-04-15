import type { Meta, StoryObj } from '@storybook/react';

import { BricksBadge } from './Badge';

const meta = {
  title: 'Bricks/Badge',
  component: BricksBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'danger'],
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
} satisfies Meta<typeof BricksBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Success: Story = {
  args: {
    children: 'New',
    variant: 'success',
  },
};

export const Danger: Story = {
  args: {
    children: 'Expired',
    variant: 'danger',
  },
};
