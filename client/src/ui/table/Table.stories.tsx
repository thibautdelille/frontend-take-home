import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Role, User } from '../../api/types'
import { toRoleTableModel, toUserTableModel } from '../../tables'
import { Table } from './index'

const mockUsers: User[] = [
  {
    id: '1',
    createdAt: '2024-08-27T23:16:10.554Z',
    updatedAt: '2024-09-03T23:16:10.554Z',
    first: 'Mark',
    last: 'Tipton',
    roleId: 'design',
    photo: 'https://i.pravatar.cc/400?img=51',
  },
  {
    id: '2',
    createdAt: '2024-07-16T23:16:10.554Z',
    updatedAt: '2024-08-27T23:16:10.554Z',
    first: 'Jennifer',
    last: 'Todd',
    roleId: 'engineering',
    photo: 'https://i.pravatar.cc/400?img=45',
  },
]

const roleNames: Record<string, string> = {
  design: 'Design',
  engineering: 'Engineering',
}

const mockRoles: Role[] = [
  {
    id: 'design',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    name: 'Design',
    description: 'Product and brand design',
    isDefault: false,
  },
  {
    id: 'engineering',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    name: 'Engineering',
    description: 'Software development',
    isDefault: true,
  },
]

const meta = {
  title: 'Design System/Table',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Mark Tipton</Table.Cell>
          <Table.Cell>Design</Table.Cell>
          <Table.Cell>Aug 27, 2024</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
}

export const DataTableUsers: Story = {
  render: () => (
    <Table.DataTable
      variant="surface"
      model={toUserTableModel(mockUsers, (roleId) => roleNames[roleId] ?? roleId)}
    />
  ),
}

export const DataTableLoading: Story = {
  render: () => (
    <Table.DataTable
      variant="surface"
      model={{ columns: [{ header: 'User' }, { header: 'Role' }, { header: 'Joined' }], rows: [] }}
      isLoading
    />
  ),
}

export const DataTableSearching: Story = {
  render: () => (
    <Table.DataTable
      variant="surface"
      model={toUserTableModel(mockUsers, (roleId) => roleNames[roleId] ?? roleId)}
      isLoading
    />
  ),
}

export const DataTableRoles: Story = {
  render: () => (
    <Table.DataTable variant="surface" model={toRoleTableModel(mockRoles)} />
  ),
}
