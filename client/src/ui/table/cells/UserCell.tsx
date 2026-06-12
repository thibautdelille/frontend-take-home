import { Avatar, Flex } from '@radix-ui/themes'
import { Text } from '../../typography'
import type { UserTableCell } from '../types'

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function UserCell({ name, imageUrl }: UserTableCell) {
  return (
    <Flex align="center" gap="2">
      <Avatar
        src={imageUrl}
        fallback={getInitials(name)}
        size="2"
        radius="full"
        alt=""
      />
      <Text as="span" size="md" weight="normal">
        {name}
      </Text>
    </Flex>
  )
}
