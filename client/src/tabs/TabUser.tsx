import { useMemo, useState } from 'react'
import { useRoles } from '../hooks/useRoles'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useUsers } from '../hooks/useUsers'
import { createEmptyUserTableModel, toUserTableModel } from '../tables'
import { SearchField, spacing, Table, Text } from '../ui'
import { Flex } from '@radix-ui/themes'

export function TabUser() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search.trim(), 300)

  const usersQuery = useUsers(
    debouncedSearch ? { search: debouncedSearch } : undefined,
  )
  const rolesQuery = useRoles()

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

  return (
    <Flex direction="column" gap={spacing[5]} pt={spacing[5]}>
      <SearchField value={search} onChange={setSearch} />
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
    </Flex>
  )
}
