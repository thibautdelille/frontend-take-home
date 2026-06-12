import { useMemo } from 'react'
import { useRoles } from './hooks/useRoles'
import { useUsers } from './hooks/useUsers'
import { toUserTableModel } from './tables'
import { Container, Table, Text } from './ui'

function App() {
  const usersQuery = useUsers()
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

  if (usersQuery.isPending || rolesQuery.isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <Text size="md" weight="normal">Loading...</Text>
      </main>
    )
  }

  if (usersQuery.isError || rolesQuery.isError) {
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
      <Container>
        {userTableModel && (
          <Table.DataTable variant="surface" model={userTableModel} />
        )}
      </Container>
    </main>
  )
}

export default App
