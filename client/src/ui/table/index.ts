import { Table as RadixTable } from '@radix-ui/themes'
import { DataTable } from './DataTable'
import {
  ColumnHeaderCell,
  type ColumnHeaderCellProps,
  type TableBodyProps,
  type TableCellProps,
  type TableHeaderProps,
  type TableRootProps,
  type TableRowHeaderCellProps,
  type TableRowProps,
} from './Table'

export const Table = {
  Root: RadixTable.Root,
  Header: RadixTable.Header,
  Body: RadixTable.Body,
  Row: RadixTable.Row,
  Cell: RadixTable.Cell,
  RowHeaderCell: RadixTable.RowHeaderCell,
  ColumnHeaderCell,
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
