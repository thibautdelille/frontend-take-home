import { Text } from '../../typography'
import type { LabelTableCell } from '../types'

export function LabelCell({ value }: LabelTableCell) {
  return (
    <Text as="span" size="md" weight="normal">
      {value}
    </Text>
  )
}
