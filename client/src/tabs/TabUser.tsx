import { useMemo, useState } from 'react'
import type { CreateUserInput } from '../api/types'
import { useRoles } from '../hooks/useRoles'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useCreateUser, useUsers } from '../hooks/useUsers'
import { createEmptyUserTableModel, toUserTableModel } from '../tables'
import { Button, SearchField, spacing, Table, Text, UserFormModal } from '../ui'
import { Flex } from '@radix-ui/themes'

export function TabUser() {
  const [search, setSearch] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const debouncedSearch = useDebouncedValue(search.trim(), 300)

  const usersQuery = useUsers(
    debouncedSearch ? { search: debouncedSearch } : undefined,
  )
  const rolesQuery = useRoles()
  const createUserMutation = useCreateUser()

  const roles = useMemo(
    () => rolesQuery.data?.data.map((role) => ({ id: role.id, name: role.name })) ?? [],
    [rolesQuery.data?.data],
  )

  const getRoleName = useMemo(() => {
    const roleNames = new Map(
      rolesQuery.data?.data.map((role) => [role.id, role.name]) ?? [],
    )
    return (roleId: string) => roleNames.get(roleId) ?? roleId
  }, [rolesQuery.data?.data])

  const userTableModel = useMemo(() => {
    if (!usersQuery.data || !rolesQuery.data) return createEmptyUserTableModel()
    return toUserTableModel(usersQuery.data.data, getRoleName)
  }, [usersQuery.data, rolesQuery.data, getRoleName])

  const handleCreateUser = (values: CreateUserInput) => {
    createUserMutation.mutate(values, {
      onSuccess: () => setIsCreateModalOpen(false),
    })
  }

  return (
    <Flex direction="column" gap={spacing[5]} pt={spacing[5]}>
      <Flex align="center" gap={spacing[4]}>
        <Flex flexGrow="1">
          <SearchField value={search} onChange={setSearch} />
        </Flex>
        <Button
          variant="primary"
          icon="plus"
          disabled={roles.length === 0}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add user
        </Button>
      </Flex>
      {createUserMutation.isError ? (
        <Text size="md" weight="normal" color="red">
          Failed to create user. Please try again.
        </Text>
      ) : null}
      {usersQuery.isError ? (
        <Text size="md" weight="normal" color="red">
          Failed to load users. Is the API running?
        </Text>
      ) : (
        <Table.DataTable
          variant="surface"
          model={userTableModel}
          isLoading={usersQuery.isFetching || rolesQuery.isLoading}
        />
      )}
      <UserFormModal
        open={isCreateModalOpen}
        onOpenChange={(open) => {
          setIsCreateModalOpen(open)
          if (!open) createUserMutation.reset()
        }}
        mode="create"
        roles={roles}
        onSubmit={handleCreateUser}
        isSubmitting={createUserMutation.isPending}
      />
    </Flex>
  )
}
