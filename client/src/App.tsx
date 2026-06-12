import { useMemo, useState } from 'react'
import { useRoles } from './hooks/useRoles'
import { useDebouncedValue } from './hooks/useDebouncedValue'
import { useUsers } from './hooks/useUsers'
import { createEmptyUserTableModel, toUserTableModel } from './tables'
import { Container, SearchField, spacing, Table, Text } from './ui'

function App() {
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

  const rolesReady = Boolean(rolesQuery.data)

  const userTableModel = useMemo(() => {
    if (!usersQuery.data || !rolesReady) return createEmptyUserTableModel()
    return toUserTableModel(usersQuery.data.data, getRoleName)
  }, [usersQuery.data, rolesReady, getRoleName])

  const tableIsLoading = usersQuery.isFetching || !rolesReady

  return (
    <main className="flex min-h-screen justify-center px-2">
      <Container gap={spacing[5]}>
        <SearchField value={search} onChange={setSearch} />
        {usersQuery.isError ? (
          <Text size="md" weight="normal" color="red">
            Failed to load users. Is the API running?
          </Text>
        ) : (
          <Table.DataTable
            variant="surface"
            model={userTableModel}
            isLoading={tableIsLoading}
          />
        )}
      </Container>
    </main>
  )
}

export default App
