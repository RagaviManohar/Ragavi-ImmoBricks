import type { Meta, StoryObj } from '@storybook/react'
import { TitleWithSubText } from './index'

const meta: Meta<typeof TitleWithSubText> = {
  title: 'Bricks/TitleWithSubText',
  component: TitleWithSubText,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subText: { control: 'text' },
    titleClassName: { control: 'text' },
    subTextClassName: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof TitleWithSubText>

export const Default: Story = {
  args: {
    title: 'Main Title',
    subText: 'This is a subtitle with additional information'
  }
}

export const CustomStyles: Story = {
  args: {
    title: 'Custom Styled Title',
    subText: 'Custom styled subtitle',
    titleClassName: 'text-blue-600 text-lg',
    subTextClassName: 'text-green-600'
  }
}

export const LongText: Story = {
  args: {
    title: 'This is a very long title that might wrap to multiple lines to demonstrate how the component handles long content',
    subText: 'This is also a longer subtitle text that demonstrates how the component handles multiple lines of content in the subtitle area'
  }
}
