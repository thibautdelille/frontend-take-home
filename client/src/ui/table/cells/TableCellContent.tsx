import type { TableCell } from '../types'
import { DateCell } from './DateCell'
import { LabelCell } from './LabelCell'
import { StringCell } from './StringCell'
import { UserCell } from './UserCell'

type TableCellContentProps = {
  cell: TableCell
}

export function TableCellContent({ cell }: TableCellContentProps) {
  switch (cell.kind) {
    case 'user':
      return <UserCell {...cell} />
    case 'string':
      return <StringCell {...cell} />
    case 'label':
      return <LabelCell {...cell} />
    case 'date':
      return <DateCell {...cell} />
  }
}
