import { Container, Table, Text } from './ui'
import { useRoles } from './hooks/useRoles'
import { useUsers } from './hooks/useUsers'

function App() {
  const usersQuery = useUsers()
  const rolesQuery = useRoles()

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
      <Container className="gap-2">
        <Text size="md" weight="normal">{usersQuery.data.data.length} users have been loaded</Text>
        <Text size="md" weight="normal">{rolesQuery.data.data.length} roles have been loaded</Text>
        <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>danilo@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
            <Table.Cell>zahra@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
            <Table.Cell>jasper@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      </Container>
    </main>
  )
}

export default App
