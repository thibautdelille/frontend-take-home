import { TabRole, TabUser } from './tabs'
import { Container, spacing } from './ui'
import { Tabs } from '@radix-ui/themes'

function App() {
  return (
    <main className="flex min-h-screen justify-center px-2">
      <Container gap={spacing[5]}>
        <Tabs.Root defaultValue="users" orientation="horizontal">
          <Tabs.List aria-label="Users and Roles">
            <Tabs.Trigger value="users">Users</Tabs.Trigger>
            <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="users">
            <TabUser />
          </Tabs.Content>
          <Tabs.Content value="roles">
            <TabRole />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </main>
  )
}

export default App
