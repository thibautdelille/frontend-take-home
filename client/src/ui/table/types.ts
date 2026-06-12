export type UserTableCell = {
  kind: 'user'
  name: string
  imageUrl?: string
}

export type StringTableCell = {
  kind: 'string'
  value: string
}

export type LabelTableCell = {
  kind: 'label'
  value: string
}

export type DateTableCell = {
  kind: 'date'
  value: string
}

export type TableCell = UserTableCell | StringTableCell | LabelTableCell | DateTableCell

export type TableRowAction = {
  label: string
  onSelect: () => void
}

export type TableRow = {
  id: string
  cells: TableCell[]
  actions?: TableRowAction[]
}

export type TableColumnHeader = {
  header: string
}

export type TableModel = {
  columns: TableColumnHeader[]
  rows: TableRow[]
}

export type TableColumn<T> = {
  header: string
  cell: (item: T) => TableCell
}
