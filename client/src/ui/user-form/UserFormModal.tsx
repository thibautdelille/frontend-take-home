import { Dialog, Flex, Select, TextField } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { useRef, type FormEvent } from 'react'
import type { CreateUserInput, User } from '../../api/types'
import { Button } from '../button'
import { spacing } from '../layout/spacing'
import { Text } from '../typography'

export type UserFormModalRole = {
  id: string
  name: string
}

export type UserFormModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  user?: Pick<User, 'first' | 'last' | 'roleId'>
  roles: UserFormModalRole[]
  onSubmit: (values: CreateUserInput) => void
  isSubmitting?: boolean
}

function getDefaultValues(
  mode: UserFormModalProps['mode'],
  user: UserFormModalProps['user'],
  roles: UserFormModalRole[],
): CreateUserInput {
  if (mode === 'edit' && user) {
    return {
      first: user.first,
      last: user.last,
      roleId: user.roleId,
    }
  }

  return {
    first: '',
    last: '',
    roleId: roles[0]?.id ?? '',
  }
}

function syncFormControlValue(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

type RoleFieldProps = {
  defaultValue: string
  roles: UserFormModalRole[]
}

function RoleField({ defaultValue, roles }: RoleFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Form.Field name="roleId">
      <Flex direction="column" gap={spacing[2]}>
        <Form.Label>
          <Text as="span" size="sm" weight="bold">
            Role
          </Text>
        </Form.Label>
        <Form.Control
          ref={inputRef}
          type="hidden"
          required
          defaultValue={defaultValue}
        />
        <Select.Root
          size="2"
          defaultValue={defaultValue || undefined}
          onValueChange={(roleId) => {
            if (inputRef.current) {
              syncFormControlValue(inputRef.current, roleId)
            }
          }}
        >
          <Select.Trigger placeholder="Select a role" />
          <Select.Content>
            {roles.map((role) => (
              <Select.Item key={role.id} value={role.id}>
                {role.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Form.Message match="valueMissing">
          <Text as="span" size="sm" color="red">
            Please select a role.
          </Text>
        </Form.Message>
      </Flex>
    </Form.Field>
  )
}

export function UserFormModal({
  open,
  onOpenChange,
  mode,
  user,
  roles,
  onSubmit,
  isSubmitting = false,
}: UserFormModalProps) {
  const defaultValues = getDefaultValues(mode, user, roles)
  const formKey = open
    ? `${mode}-${defaultValues.first}-${defaultValues.last}-${defaultValues.roleId}`
    : 'closed'

  const title = mode === 'create' ? 'Add user' : 'Edit user'
  const submitLabel = mode === 'create' ? 'Add user' : 'Save changes'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const formData = new FormData(event.currentTarget)
    onSubmit({
      first: String(formData.get('first')).trim(),
      last: String(formData.get('last')).trim(),
      roleId: String(formData.get('roleId')),
    })
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="400px">
        <Dialog.Title>{title}</Dialog.Title>
        <Form.Root key={formKey} onSubmit={handleSubmit}>
          <Flex direction="column" gap={spacing[4]} mt={spacing[4]}>
            <Form.Field name="first">
              <Flex direction="column" gap={spacing[2]}>
                <Form.Label>
                  <Text as="span" size="sm" weight="bold">
                    First name
                  </Text>
                </Form.Label>
                <Form.Control asChild required>
                  <TextField.Root
                    size="2"
                    variant="surface"
                    defaultValue={defaultValues.first}
                  />
                </Form.Control>
                <Form.Message match="valueMissing">
                  <Text as="span" size="sm" color="red">
                    Please enter a first name.
                  </Text>
                </Form.Message>
              </Flex>
            </Form.Field>

            <Form.Field name="last">
              <Flex direction="column" gap={spacing[2]}>
                <Form.Label>
                  <Text as="span" size="sm" weight="bold">
                    Last name
                  </Text>
                </Form.Label>
                <Form.Control asChild required>
                  <TextField.Root
                    size="2"
                    variant="surface"
                    defaultValue={defaultValues.last}
                  />
                </Form.Control>
                <Form.Message match="valueMissing">
                  <Text as="span" size="sm" color="red">
                    Please enter a last name.
                  </Text>
                </Form.Message>
              </Flex>
            </Form.Field>

            <RoleField defaultValue={defaultValues.roleId} roles={roles} />
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
      </Dialog.Content>
    </Dialog.Root>
  )
}
