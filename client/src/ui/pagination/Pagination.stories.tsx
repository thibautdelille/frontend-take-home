import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Pagination } from './Pagination'

const meta = {
  title: 'Design System/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const FirstPage: Story = {
  args: {
    hasPrevious: false,
    hasNext: true,
    onPrevious: () => {},
    onNext: () => {},
  },
}

export const MiddlePage: Story = {
  args: {
    hasPrevious: true,
    hasNext: true,
    onPrevious: () => {},
    onNext: () => {},
  },
}

export const LastPage: Story = {
  args: {
    hasPrevious: true,
    hasNext: false,
    onPrevious: () => {},
    onNext: () => {},
  },
}

export const Interactive: Story = {
  args: {
    hasPrevious: false,
    hasNext: true,
    onPrevious: () => {},
    onNext: () => {},
  },
  render: () => {
    const [page, setPage] = useState(1)
    const totalPages = 3

    return (
      <Pagination
        hasPrevious={page > 1}
        hasNext={page < totalPages}
        onPrevious={() => setPage((current) => Math.max(1, current - 1))}
        onNext={() => setPage((current) => Math.min(totalPages, current + 1))}
      />
    )
  },
}
