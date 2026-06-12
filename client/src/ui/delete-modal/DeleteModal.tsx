import { AlertDialog, Flex } from '@radix-ui/themes'
import { Button } from '../button'
import { spacing } from '../layout/spacing'
import { Text } from '../typography'

export type DeleteModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemName: string
  title?: string
  confirmLabel?: string
  onConfirm: () => void
  isConfirming?: boolean
}

export function DeleteModal({
  open,
  onOpenChange,
  itemName,
  title = 'item',
  confirmLabel = 'Delete',
  onConfirm,
  isConfirming = false,
}: DeleteModalProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="400px">
        <AlertDialog.Title>Delete {title}</AlertDialog.Title>
        <AlertDialog.Description>
          <Text as="p" size="md" weight="normal" tone="secondary">
            Are you sure you? The {title.toLowerCase()} <Text as="span" weight="bold">{itemName}</Text> will be permanently deleted.
          </Text>
        </AlertDialog.Description>
        <Flex gap={spacing[3]} justify="end" mt={spacing[4]}>
          <AlertDialog.Cancel>
            <Button variant="secondary" disabled={isConfirming}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <Button variant="danger" loading={isConfirming} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
