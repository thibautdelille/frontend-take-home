import { Text } from '../../typography'
import { formatTableDate } from '../formatDate'
import type { DateTableCell } from '../types'

export function DateCell({ value }: DateTableCell) {
  return (
    <Text as="span" size="md" weight="normal">
      {formatTableDate(value)}
    </Text>
  )
}
