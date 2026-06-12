import type { Role } from '../api/types'
import { buildTableModel } from '../ui/table/buildTableModel'
import type { TableColumn, TableModel, TableRowAction } from '../ui/table/types'

const roleTableHeaders = [
  { header: 'Name' },
  { header: 'Description' },
  { header: 'Created', minWidth: '144px' },
  { header: 'Default' },
] as const

export function createEmptyRoleTableModel(): TableModel {
  return {
    columns: roleTableHeaders.map((column) => ({ ...column })),
    rows: [],
  }
}

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
      header: 'Created',
      minWidth: '144px',
      cell: (role) => ({
        kind: 'date',
        value: role.createdAt,
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

export function toRoleTableModel(
  roles: Role[],
  getRowActions?: (role: Role) => TableRowAction[],
) {
  return buildTableModel(roles, roleTableColumns(), (role) => role.id, getRowActions)
}
