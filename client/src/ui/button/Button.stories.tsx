import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertDialog, Flex, Text } from '@radix-ui/themes'
import { Pagination as PaginationControls } from '../pagination'
import { Button } from './Button'

const meta = {
  title: 'Design System/Button',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <Button variant="primary" icon="plus">
      Add user
    </Button>
  ),
}

export const PaginationButtons: Story = {
  render: () => (
    <PaginationControls
      hasPrevious={false}
      hasNext
      onPrevious={() => {}}
      onNext={() => {}}
    />
  ),
}

export const AllVariants: Story = {
  render: () => (
    <Flex direction="column" gap="3" align="start">
      <Button variant="primary" icon="plus">
        Add user
      </Button>
      <Button variant="secondary" size="sm">
        Next
      </Button>
      <Button variant="subtle" size="sm" disabled>
        Previous
      </Button>
      <Button variant="danger">Delete user</Button>
    </Flex>
  ),
}

export const DeleteUserModal: Story = {
  render: () => (
    <AlertDialog.Root defaultOpen>
      <AlertDialog.Content maxWidth="400px">
        <AlertDialog.Title>Delete user</AlertDialog.Title>
        <AlertDialog.Description>
          <Text as="p" size="2">
            Are you sure you want to delete this user? This action cannot be undone.
          </Text>
        </AlertDialog.Description>
        <Flex gap="3" justify="end" mt="4">
          <AlertDialog.Cancel>
            <Button variant="secondary">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="danger">Delete user</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}
