import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../button'
import { RoleFormModal } from './RoleFormModal'

const mockRole = {
  name: 'Engineering',
  description: 'Software development',
  isDefault: false,
}

const mockDefaultRole = {
  name: 'Member',
  description: 'Default access for new users',
  isDefault: true,
}

const meta = {
  title: 'Design System/RoleFormModal',
  component: RoleFormModal,
  parameters: {
    layout: 'centered',
  },
  args: {
    onSubmit: () => {},
  },
} satisfies Meta<typeof RoleFormModal>

export default meta
type Story = StoryObj<typeof meta>

export const CreateRole: Story = {
  args: {
    open: true,
    mode: 'create',
    onOpenChange: () => {},
  },
}

export const EditRole: Story = {
  args: {
    open: true,
    mode: 'edit',
    role: mockRole,
    onOpenChange: () => {},
  },
}

export const EditDefaultRole: Story = {
  args: {
    open: true,
    mode: 'edit',
    role: mockDefaultRole,
    onOpenChange: () => {},
  },
}

export const Submitting: Story = {
  args: {
    open: true,
    mode: 'create',
    isSubmitting: true,
    onOpenChange: () => {},
  },
}

export const WithTrigger: Story = {
  args: {
    open: false,
    mode: 'create',
    onOpenChange: () => {},
  },
  render: (args) => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button variant="primary" icon="plus" onClick={() => setOpen(true)}>
          Add role
        </Button>
        <RoleFormModal
          {...args}
          open={open}
          mode="create"
          onOpenChange={setOpen}
          onSubmit={() => setOpen(false)}
        />
      </>
    )
  },
}
