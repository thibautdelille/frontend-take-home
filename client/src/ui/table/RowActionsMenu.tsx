import { IconButton, DropdownMenu, Flex } from '@radix-ui/themes'
import type { TableRowAction } from './types'
import { Icon } from '../icons'

type RowActionsMenuProps = {
  actions: TableRowAction[]
}

export function RowActionsMenu({ actions }: RowActionsMenuProps) {
  return (
    <Flex justify="end">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton
            variant="ghost"
            color="gray"
            radius="full"
            size="1"
            aria-label="Row actions"
          >
            <Icon name="dotsHorizontal" />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          {actions.map((action) => (
            <DropdownMenu.Item key={action.label} onSelect={action.onSelect}>
              {action.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}
