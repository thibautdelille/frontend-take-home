import { useMemo, useState } from 'react'
import { useRoles } from './hooks/useRoles'
import { useDebouncedValue } from './hooks/useDebouncedValue'
import { useUsers } from './hooks/useUsers'
import { toUserTableModel } from './tables'
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

  const userTableModel = useMemo(() => {
    if (!usersQuery.data) return null
    return toUserTableModel(usersQuery.data.data, getRoleName)
  }, [usersQuery.data, getRoleName])

  if (rolesQuery.isPending || (usersQuery.isPending && !usersQuery.data)) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <Text size="md" weight="normal">Loading...</Text>
      </main>
    )
  }

  if (rolesQuery.isError || usersQuery.isError) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <Text size="md" weight="normal" color="red">
          Failed to load data. Is the API running?
        </Text>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen justify-center px-2">
      <Container gap={spacing[5]}>
        <SearchField value={search} onChange={setSearch} />
        {userTableModel && (
          <Table.DataTable variant="surface" model={userTableModel} />
        )}
      </Container>
    </main>
  )
}

export default App
