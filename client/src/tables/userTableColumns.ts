import type { User } from '../api/types'
import { buildTableModel } from '../ui/table/buildTableModel'
import type { TableColumn, TableModel, TableRowAction } from '../ui/table/types'

const userTableHeaders = ['User', 'Role', 'Joined'] as const

export function createEmptyUserTableModel(): TableModel {
  return {
    columns: userTableHeaders.map((header) => ({ header })),
    rows: [],
  }
}

export function userTableColumns(
  getRoleName: (roleId: string) => string,
): TableColumn<User>[] {
  return [
    {
      header: 'User',
      cell: (user) => ({
        kind: 'user',
        name: `${user.first} ${user.last}`,
        imageUrl: user.photo,
      }),
    },
    {
      header: 'Role',
      cell: (user) => ({
        kind: 'label',
        value: getRoleName(user.roleId),
      }),
    },
    {
      header: 'Joined',
      cell: (user) => ({
        kind: 'date',
        value: user.createdAt,
      }),
    },
  ]
}

export function toUserTableModel(
  users: User[],
  getRoleName: (roleId: string) => string,
  getRowActions?: (user: User) => TableRowAction[],
) {
  return buildTableModel(
    users,
    userTableColumns(getRoleName),
    (user) => user.id,
    getRowActions,
  )
}
