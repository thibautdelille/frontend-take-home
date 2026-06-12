import type { Role } from '../api/types'
import { buildTableModel } from '../ui/table/buildTableModel'
import type { TableColumn } from '../ui/table/types'

export function roleTableColumns(): TableColumn<Role>[] {
  return [
    {
      header: 'Name',
      cell: (role) => ({
        kind: 'label',
        value: role.name,
      }),
    },
    {
      header: 'Description',
      cell: (role) => ({
        kind: 'string',
        value: role.description ?? '—',
      }),
    },
    {
      header: 'Default',
      cell: (role) => ({
        kind: 'string',
        value: role.isDefault ? 'Yes' : 'No',
      }),
    },
  ]
}

export function toRoleTableModel(roles: Role[]) {
  return buildTableModel(roles, roleTableColumns())
}
