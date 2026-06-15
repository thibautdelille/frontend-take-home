import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../button'
import { DeleteModal } from './DeleteModal'

const meta = {
  title: 'Design System/DeleteModal',
  component: DeleteModal,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DeleteModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    itemName: 'Mark Tipton',
    title: 'user',
    confirmLabel: 'Delete user',
    onConfirm: () => {},
    onOpenChange: () => {},
  },
}

export const WithTrigger: Story = {
  args: {
    open: false,
    itemName: 'Mark Tipton',
    title: 'user',
    confirmLabel: 'Delete user',
    onConfirm: () => {},
    onOpenChange: () => {},
  },
  render: (args) => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete user
        </Button>
        <DeleteModal
          {...args}
          open={open}
          onOpenChange={setOpen}
          onConfirm={() => setOpen(false)}
        />
      </>
    )
  },
}

export const Confirming: Story = {
  args: {
    open: true,
    itemName: 'Jennifer Todd',
    title: 'user',
    confirmLabel: 'Delete user',
    isConfirming: true,
    onConfirm: () => {},
    onOpenChange: () => {},
  },
}
