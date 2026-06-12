import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from '@radix-ui/themes'
import { Button } from '../button'
import { spacing } from '../layout/spacing'
import { useToast } from './useToast'

const meta = {
  title: 'Design System/Toast',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function ToastDemo() {
  const toast = useToast()

  return (
    <Flex direction="column" gap={spacing[3]} align="start">
      <Flex gap={spacing[3]} wrap="wrap">
        <Button
          variant="primary"
          onClick={() =>
            toast.open({
              message: 'User created successfully.',
              type: 'success',
            })
          }
        >
          Success
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            toast.open({
              message: 'Failed to save changes. Please try again.',
              type: 'failure',
            })
          }
        >
          Failure
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.open({
              message: 'Your session will expire in 5 minutes.',
              type: 'info',
            })
          }
        >
          Info
        </Button>
        <Button variant="subtle" onClick={() => toast.close()}>
          Close
        </Button>
      </Flex>
    </Flex>
  )
}

export const Default: Story = {
  render: () => <ToastDemo />,
}

function CustomDurationDemo() {
  const toast = useToast()

  return (
    <Button
      variant="primary"
      onClick={() =>
        toast.open({
          message: 'This toast closes after 3 seconds.',
          type: 'info',
          duration: 3000,
        })
      }
    >
      Show 3s toast
    </Button>
  )
}

export const CustomDuration: Story = {
  render: () => <CustomDurationDemo />,
}
