import type { Meta, StoryObj } from '@storybook/react-vite'
import { borderClasses, surfaceClasses, textToneClasses } from './colors'

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TextTones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {Object.entries(textToneClasses).map(([name, className]) => (
        <p key={name} className={`text-2-normal ${className}`}>
          {name} — {className}
        </p>
      ))}
    </div>
  ),
}

export const SurfacesAndBorders: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className={`rounded-lg border p-4 ${surfaceClasses.surface} border-default`}>
        surface + border-default — table card
      </div>
      <div className={`rounded-lg border p-4 ${surfaceClasses.subtle} border-default`}>
        subtle + border-default — table header row
      </div>
      <div className={`rounded border p-4 ${surfaceClasses.surface} ${borderClasses.input}`}>
        surface + border-input — text field
      </div>
      <div className={`inline-flex rounded px-3 py-2 text-2-bold text-white ${surfaceClasses.accent}`}>
        accent — primary button
      </div>
    </div>
  ),
}
