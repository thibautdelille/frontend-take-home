import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../button'
import { UserFormModal, type UserFormModalRole } from './UserFormModal'

const mockRoles: UserFormModalRole[] = [
  { id: 'design', name: 'Design' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'marketing', name: 'Marketing' },
]

const mockUser = {
  first: 'Mark',
  last: 'Tipton',
  roleId: 'design',
}

const meta = {
  title: 'Design System/UserFormModal',
  component: UserFormModal,
  parameters: {
    layout: 'centered',
  },
  args: {
    roles: mockRoles,
    onSubmit: () => {},
  },
} satisfies Meta<typeof UserFormModal>

export default meta
type Story = StoryObj<typeof meta>

export const CreateUser: Story = {
  args: {
    open: true,
    mode: 'create',
    onOpenChange: () => {},
  },
}

export const EditUser: Story = {
  args: {
    open: true,
    mode: 'edit',
    user: mockUser,
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
          Add user
        </Button>
        <UserFormModal
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
