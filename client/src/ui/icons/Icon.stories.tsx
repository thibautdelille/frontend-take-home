import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Icon } from './Icon'
import { IconButton } from '@radix-ui/themes'

const meta = {
  title: 'Design System/Icons',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Plus: Story = {
  render: () => <Icon name="plus" />,
}

export const DotsHorizontal: Story = {
  render: () => <Icon name="dotsHorizontal" />,
}

export const MagnifyingGlass: Story = {
  render: () => <Icon name="magnifyingGlass" />,
}

export const WithButton: Story = {
  render: () => (
    <Button variant="primary" icon="plus">
      Add user
    </Button>
  ),
}

export const WithAccessibleLabel: Story = {
  render: () => (
    <IconButton
    variant="ghost"
    color="gray"
    radius="full"
    size="1"
    aria-label="Row actions"
  >
      <Icon name="dotsHorizontal" label="User actions" />
    </IconButton>
  ),
}
