import type { Meta, StoryObj } from '@storybook/react-vite'
import { withQueryData } from '../.storybook/decorators'
import App from './App'

const meta = {
  title: 'App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withQueryData()],
} satisfies Meta<typeof App>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
