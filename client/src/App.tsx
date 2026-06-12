import { Text } from '@radix-ui/themes'
import { useRoles } from './hooks/useRoles'
import { useUsers } from './hooks/useUsers'

function App() {
  const usersQuery = useUsers()
  const rolesQuery = useRoles()

  if (usersQuery.isPending || rolesQuery.isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <Text>Loading...</Text>
      </main>
    )
  }

  if (usersQuery.isError || rolesQuery.isError) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <Text color="red">Failed to load data. Is the API running?</Text>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-8">
      <Text>{usersQuery.data.data.length} users have been loaded</Text>
      <Text>{rolesQuery.data.data.length} roles have been loaded</Text>
    </main>
  )
}

export default App
