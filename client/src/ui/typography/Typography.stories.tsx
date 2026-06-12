import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './Text'
import { textToneClasses, typographyClasses } from './typography'

const meta = {
  title: 'Design System/Typography',
  component: Text,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const SizesAndWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Text size="md" weight="bold">
        md / bold — tabs, table headers, buttons
      </Text>
      <Text size="md" weight="normal">
        md / normal — table cells, placeholders
      </Text>
      <Text size="sm" weight="bold">
        sm / bold — pagination
      </Text>
      <Text size="sm" weight="normal">
        sm / normal
      </Text>
    </div>
  ),
}

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Text tone="primary">primary — default body text</Text>
      <Text tone="secondary">secondary — inactive tab</Text>
      <Text tone="placeholder">placeholder — search input</Text>
      <Text tone="disabled">disabled — pagination</Text>
      <Text color="red">color="red" — destructive actions</Text>
    </div>
  ),
}

export const TailwindUtilities: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className={`${typographyClasses.mdBold} ${textToneClasses.primary}`}>
        text-2-bold — md / bold
      </p>
      <p className={`${typographyClasses.mdNormal} ${textToneClasses.secondary}`}>
        text-2-normal — md / normal
      </p>
      <p className={`${typographyClasses.smBold} ${textToneClasses.disabled}`}>
        text-1-bold — sm / bold
      </p>
    </div>
  ),
}
