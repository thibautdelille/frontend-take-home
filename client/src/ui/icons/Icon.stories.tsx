import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, IconButton } from '@radix-ui/themes'
import { Icon } from './Icon'

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
    <Button>
      <Icon name="plus" />
      Add user
    </Button>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <IconButton variant="ghost" aria-label="User actions">
      <Icon name="dotsHorizontal" />
    </IconButton>
  ),
}

export const WithAccessibleLabel: Story = {
  render: () => (
    <button type="button" className="inline-flex rounded-full p-1 hover:bg-subtle">
      <Icon name="dotsHorizontal" label="User actions" />
    </button>
  ),
}
