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
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Badge variant from shadcn/ui',
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

// New badge will use direct styling from Figma design
export const New: Story = {
  args: {
    children: 'New',
  },
};

// Expired badge will use direct styling from Figma design
export const Expired: Story = {
  args: {
    children: 'Expired',
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
