import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from './Container'
import { Text } from '../typography'

const meta = {
  title: 'Design System/Container',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <main className="flex min-h-screen justify-center px-2">
      <Container className="gap-5">
        <Text size="md" weight="bold">
          Page container
        </Text>
        <Text size="md" weight="normal" tone="secondary">
          850px max width, flex column, 40px top padding (space/7)
        </Text>
        <div className="h-40 w-full rounded border border-dashed border-default bg-subtle" />
      </Container>
    </main>
  ),
}
