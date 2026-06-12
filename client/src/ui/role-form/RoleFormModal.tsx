import { Dialog, Flex, Switch, TextArea, TextField } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { useState, type FormEvent } from 'react'
import type { CreateRoleInput, Role } from '../../api/types'
import { Button } from '../button'
import { spacing } from '../layout/spacing'
import { Text } from '../typography'

export type RoleFormModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  role?: Pick<Role, 'name' | 'description' | 'isDefault'>
  onSubmit: (values: CreateRoleInput) => void
  isSubmitting?: boolean
}

function getDefaultValues(
  mode: RoleFormModalProps['mode'],
  role: RoleFormModalProps['role'],
): CreateRoleInput {
  if (mode === 'edit' && role) {
    return {
      name: role.name,
      description: role.description ?? '',
      isDefault: role.isDefault,
    }
  }

  return {
    name: '',
    description: '',
    isDefault: false,
  }
}

type RoleFormProps = {
  defaultValues: CreateRoleInput
  mode: RoleFormModalProps['mode']
  submitLabel: string
  isDefaultRole: boolean
  isSubmitting: boolean
  onSubmit: RoleFormModalProps['onSubmit']
}

function RoleForm({
  defaultValues,
  mode,
  submitLabel,
  isDefaultRole,
  isSubmitting,
  onSubmit,
}: RoleFormProps) {
  const [isDefault, setIsDefault] = useState(Boolean(defaultValues.isDefault))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const formData = new FormData(event.currentTarget)
    onSubmit({
      name: String(formData.get('name')).trim(),
      description: String(formData.get('description')).trim(),
      isDefault,
    })
  }

  return (
    <Form.Root onSubmit={handleSubmit}>
      <Flex direction="column" gap={spacing[4]} mt={spacing[4]}>
        <Form.Field name="name">
          <Flex direction="column" gap={spacing[2]}>
            <Form.Label>
              <Text as="span" size="sm" weight="bold">
                Name
              </Text>
            </Form.Label>
            <Form.Control asChild required>
              <TextField.Root
                size="2"
                variant="surface"
                defaultValue={defaultValues.name}
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              <Text as="span" size="sm" color="red">
                Please enter a role name.
              </Text>
            </Form.Message>
          </Flex>
        </Form.Field>

        <Form.Field name="description">
          <Flex direction="column" gap={spacing[2]}>
            <Form.Label>
              <Text as="span" size="sm" weight="bold">
                Description
              </Text>
            </Form.Label>
            <Form.Control asChild>
              <TextArea
                size="2"
                variant="surface"
                defaultValue={defaultValues.description}
              />
            </Form.Control>
          </Flex>
        </Form.Field>

        <Flex align="center" justify="between" gap={spacing[4]}>
          <Flex direction="column" gap={spacing[1]}>
            <Text as="span" size="sm" weight="bold">
              Default role
            </Text>
            <Text as="span" size="sm" weight="normal" tone="secondary">
              New users use this role unless another role is selected.
            </Text>
          </Flex>
          <Switch
            aria-label="Default role"
            checked={isDefault}
            disabled={isSubmitting || isDefaultRole}
            onCheckedChange={setIsDefault}
          />
        </Flex>
      </Flex>

      <Flex gap={spacing[3]} justify="end" mt={spacing[5]}>
        <Dialog.Close>
          <Button variant="secondary" type="button" disabled={isSubmitting}>
            Cancel
          </Button>
        </Dialog.Close>
        <Button
          variant="primary"
          type="submit"
          icon={mode === 'create' ? 'plus' : undefined}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {submitLabel}
        </Button>
      </Flex>
    </Form.Root>
  )
}

export function RoleFormModal({
  open,
  onOpenChange,
  mode,
  role,
  onSubmit,
  isSubmitting = false,
}: RoleFormModalProps) {
  const defaultValues = getDefaultValues(mode, role)
  const formKey = open
    ? `${mode}-${defaultValues.name}-${defaultValues.description}-${defaultValues.isDefault}`
    : 'closed'

  const title = mode === 'create' ? 'Add role' : 'Edit role'
  const submitLabel = mode === 'create' ? 'Add role' : 'Save changes'
  const isDefaultRole = mode === 'edit' && Boolean(role?.isDefault)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="400px">
        <Dialog.Title>{title}</Dialog.Title>
        <RoleForm
          key={formKey}
          defaultValues={defaultValues}
          mode={mode}
          submitLabel={submitLabel}
          isDefaultRole={isDefaultRole}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}
