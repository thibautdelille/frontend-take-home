import { Table as RadixTable } from '@radix-ui/themes'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Text } from '../typography'

export type TableRootProps = ComponentPropsWithoutRef<typeof RadixTable.Root>
export type TableHeaderProps = ComponentPropsWithoutRef<typeof RadixTable.Header>
export type TableBodyProps = ComponentPropsWithoutRef<typeof RadixTable.Body>
export type TableRowProps = ComponentPropsWithoutRef<typeof RadixTable.Row>
export type TableCellProps = ComponentPropsWithoutRef<typeof RadixTable.Cell>
export type TableRowHeaderCellProps = ComponentPropsWithoutRef<
  typeof RadixTable.RowHeaderCell
>

export type ColumnHeaderCellProps = ComponentPropsWithoutRef<
  typeof RadixTable.ColumnHeaderCell
> & {
  children?: ReactNode
}

function ColumnHeaderCell({ children, ...props }: ColumnHeaderCellProps) {
  return (
    <RadixTable.ColumnHeaderCell {...props}>
      <Text as="span" size="md" weight="bold">
        {children}
      </Text>
    </RadixTable.ColumnHeaderCell>
  )
}

export const Table = {
  Root: RadixTable.Root,
  Header: RadixTable.Header,
  Body: RadixTable.Body,
  Row: RadixTable.Row,
  Cell: RadixTable.Cell,
  RowHeaderCell: RadixTable.RowHeaderCell,
  ColumnHeaderCell,
}
