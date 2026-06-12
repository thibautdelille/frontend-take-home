import { Text } from '../../typography'
import type { StringTableCell } from '../types'

export function StringCell({ value }: StringTableCell) {
  return (
    <Text as="span" size="md" weight="normal">
      {value}
    </Text>
  )
}
