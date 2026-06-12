import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertDialog, Flex, Text } from '@radix-ui/themes'
import { Button } from './Button'
import { IconButton } from './IconButton'

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

export const Pagination: Story = {
  render: () => (
    <Flex gap="2">
      <Button variant="subtle" size="sm" disabled>
        Previous
      </Button>
      <Button variant="secondary" size="sm">
        Next
      </Button>
    </Flex>
  ),
}

export const IconOnly: Story = {
  render: () => <IconButton icon="dotsHorizontal" label="User actions" />,
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
      <IconButton icon="dotsHorizontal" label="User actions" />
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
