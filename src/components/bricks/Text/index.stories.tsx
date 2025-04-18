import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '@/components/bricks/Text';

const meta = {
  title: 'Bricks/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Main text content',
    },
    subText: {
      control: 'text',
      description: 'Optional secondary text content',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the main text',
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight of the main text',
    },
    color: {
      control: { type: 'select' },
      options: ['black', 'gray'],
      description: 'Color of the main text',
    },
    subTextSize: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the sub text',
    },
    subTextWeight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight of the sub text',
    },
    subTextColor: {
      control: { type: 'select' },
      options: ['black', 'gray'],
      description: 'Color of the sub text',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default configuration
export const Default: Story = {
  args: {
    text: 'Main Text',
    subText: 'Subtext content',
    size: 'sm',
    weight: 'normal',
    color: 'black',
    subTextSize: 'xs',
    subTextWeight: 'normal',
    subTextColor: 'gray',
  },
};

// Without subtext
export const TextOnly: Story = {
  args: {
    text: 'Main Text Only',
    size: 'sm',
    weight: 'normal',
    color: 'black',
  },
};

// Different sizes
export const ExtraSmallSize: Story = {
  args: {
    text: 'Extra Small Text',
    subText: 'Extra small subtext',
    size: 'xs',
    subTextSize: 'xs',
  },
};

export const MediumSize: Story = {
  args: {
    text: 'Medium Text',
    subText: 'Medium subtext',
    size: 'md',
    subTextSize: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    text: 'Large Text',
    subText: 'Large subtext',
    size: 'lg',
    subTextSize: 'md',
  },
};

// Different weights
export const MediumWeight: Story = {
  args: {
    text: 'Medium Weight Text',
    subText: 'Normal weight subtext',
    weight: 'medium',
  },
};

export const SemiboldWeight: Story = {
  args: {
    text: 'Semibold Text',
    subText: 'Normal weight subtext',
    weight: 'semibold',
  },
};

export const BoldWeight: Story = {
  args: {
    text: 'Bold Text',
    subText: 'Normal weight subtext',
    weight: 'bold',
  },
};

// Different colors
export const GrayText: Story = {
  args: {
    text: 'Gray Main Text',
    subText: 'Black subtext',
    color: 'gray',
    subTextColor: 'black',
  },
};

// Custom subtext attributes
export const CustomSubtext: Story = {
  args: {
    text: 'Main Text',
    subText: 'Custom Subtext',
    subTextSize: 'sm',
    subTextWeight: 'semibold',
    subTextColor: 'black',
  },
}; 