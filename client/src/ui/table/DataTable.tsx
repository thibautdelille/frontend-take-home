import { Box, Flex, Spinner, Table as RadixTable } from '@radix-ui/themes'
import { Text } from '../typography'
import { TableCellContent } from './cells'
import { RowActionsMenu } from './RowActionsMenu'
import { ColumnHeaderCell, type TableRootProps } from './Table'
import type { TableModel } from './types'

function hasRowActions(model: TableModel) {
  return model.rows.some((row) => row.actions && row.actions.length > 0)
}

export type DataTableProps = {
  model: TableModel
  isLoading?: boolean
} & Omit<TableRootProps, 'children'>

function TableLoadingRow({ columnCount }: { columnCount: number }) {
  return (
    <RadixTable.Row>
      <RadixTable.Cell colSpan={columnCount}>
        <Flex align="center" justify="center" py="6">
          <Spinner size="2" />
        </Flex>
      </RadixTable.Cell>
    </RadixTable.Row>
  )
}

function TableEmptyRow({ columnCount }: { columnCount: number }) {
  return (
    <RadixTable.Row>
      <RadixTable.Cell colSpan={columnCount}>
        <Flex align="center" justify="center" py="6">
          <Text as="span" size="md" weight="normal" tone="secondary">
            No results
          </Text>
        </Flex>
      </RadixTable.Cell>
    </RadixTable.Row>
  )
}

export function DataTable({ model, isLoading = false, ...rootProps }: DataTableProps) {
  const hasRows = model.rows.length > 0
  const showActionsColumn = hasRowActions(model)
  const columnCount = model.columns.length + (showActionsColumn ? 1 : 0)
  const showInitialLoading = isLoading && !hasRows
  const showOverlay = isLoading && hasRows

  return (
    <Box position="relative">
      <RadixTable.Root {...rootProps} aria-busy={isLoading}>
        <RadixTable.Header>
          <RadixTable.Row>
            {model.columns.map((column) => (
              <ColumnHeaderCell key={column.header}>{column.header}</ColumnHeaderCell>
            ))}
            {showActionsColumn && (
              <ColumnHeaderCell aria-label="Actions" />
            )}
          </RadixTable.Row>
        </RadixTable.Header>
        <RadixTable.Body>
          {hasRows &&
            model.rows.map((row) => (
              <RadixTable.Row key={row.id}>
                {row.cells.map((cell, index) => (
                  <RadixTable.Cell key={`${row.id}-${index}`}>
                    <TableCellContent cell={cell} />
                  </RadixTable.Cell>
                ))}
                {showActionsColumn && (
                  <RadixTable.Cell>
                    {row.actions && row.actions.length > 0 ? (
                      <RowActionsMenu actions={row.actions} />
                    ) : null}
                  </RadixTable.Cell>
                )}
              </RadixTable.Row>
            ))}
          {showInitialLoading && (
            <TableLoadingRow columnCount={columnCount} />
          )}
          {!isLoading && !hasRows && (
            <TableEmptyRow columnCount={columnCount} />
          )}
        </RadixTable.Body>
      </RadixTable.Root>
      {showOverlay && (
        <Flex
          align="center"
          justify="center"
          position="absolute"
          inset="0"
          className="bg-surface/70"
        >
          <Spinner size="2" />
        </Flex>
      )}
    </Box>
  )
}
