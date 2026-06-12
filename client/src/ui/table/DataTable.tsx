import { Table as RadixTable } from '@radix-ui/themes'
import { TableCellContent } from './cells'
import { ColumnHeaderCell, type TableRootProps } from './Table'
import type { TableModel } from './types'

export type DataTableProps = {
  model: TableModel
} & Omit<TableRootProps, 'children'>

export function DataTable({ model, ...rootProps }: DataTableProps) {
  return (
    <RadixTable.Root {...rootProps}>
      <RadixTable.Header>
        <RadixTable.Row>
          {model.columns.map((column) => (
            <ColumnHeaderCell key={column.header}>{column.header}</ColumnHeaderCell>
          ))}
        </RadixTable.Row>
      </RadixTable.Header>
      <RadixTable.Body>
        {model.rows.map((row) => (
          <RadixTable.Row key={row.id}>
            {row.cells.map((cell, index) => (
              <RadixTable.Cell key={`${row.id}-${index}`}>
                <TableCellContent cell={cell} />
              </RadixTable.Cell>
            ))}
          </RadixTable.Row>
        ))}
      </RadixTable.Body>
    </RadixTable.Root>
  )
}
