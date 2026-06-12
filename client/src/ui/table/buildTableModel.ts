import type { TableColumn, TableModel } from './types'

type Identifiable = {
  id: string
}

export function buildTableModel<T extends Identifiable>(
  items: T[],
  columns: TableColumn<T>[],
  getRowId: (item: T) => string = (item) => item.id,
): TableModel {
  return {
    columns: columns.map(({ header }) => ({ header })),
    rows: items.map((item) => ({
      id: getRowId(item),
      cells: columns.map((column) => column.cell(item)),
    })),
  }
}
