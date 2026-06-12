import type { User } from '../api/types'
import { buildTableModel } from '../ui/table/buildTableModel'
import type { TableColumn } from '../ui/table/types'

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
) {
  return buildTableModel(users, userTableColumns(getRoleName))
}
