import type { Preview } from '@storybook/react-vite'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <Theme accentColor="purple" grayColor="gray" radius="medium">
        <Story />
      </Theme>
    ),
  ],
}

export default preview
