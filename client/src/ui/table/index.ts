import { DataTable } from './DataTable'
import {
  Table as TableBase,
  type ColumnHeaderCellProps,
  type TableBodyProps,
  type TableCellProps,
  type TableHeaderProps,
  type TableRootProps,
  type TableRowHeaderCellProps,
  type TableRowProps,
} from './Table'

export const Table = {
  ...TableBase,
  DataTable,
}

export { buildTableModel } from './buildTableModel'
export { formatTableDate } from './formatDate'
export type {
  DateTableCell,
  LabelTableCell,
  StringTableCell,
  TableCell,
  TableColumn,
  TableColumnHeader,
  TableModel,
  TableRow,
  TableRowAction,
  UserTableCell,
} from './types'
export type { DataTableProps } from './DataTable'
export {
  type ColumnHeaderCellProps,
  type TableBodyProps,
  type TableCellProps,
  type TableHeaderProps,
  type TableRootProps,
  type TableRowHeaderCellProps,
  type TableRowProps,
}
