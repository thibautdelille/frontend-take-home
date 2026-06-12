import type { TableColumn, TableModel, TableRowAction } from './types'

type Identifiable = {
  id: string
}

export function buildTableModel<T extends Identifiable>(
  items: T[],
  columns: TableColumn<T>[],
  getRowId: (item: T) => string = (item) => item.id,
  getRowActions?: (item: T) => TableRowAction[],
): TableModel {
  return {
    columns: columns.map(({ header }) => ({ header })),
    rows: items.map((item) => ({
      id: getRowId(item),
      cells: columns.map((column) => column.cell(item)),
      ...(getRowActions ? { actions: getRowActions(item) } : {}),
    })),
  }
}
