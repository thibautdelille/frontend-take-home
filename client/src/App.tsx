import { TabUser } from './tabs'
import { Container, spacing } from './ui'
import { Tabs } from '@radix-ui/themes'

function App() {
  return (
    <main className="flex min-h-screen justify-center px-2">
      <Container gap={spacing[5]}>
        <Tabs.Root defaultValue="tab1" orientation="vertical">
          <Tabs.List aria-label="tabs example">
            <Tabs.Trigger value="tab1">Users</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Roles</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <TabUser />
          </Tabs.Content>
          <Tabs.Content value="tab2">Roles Tabs goes here</Tabs.Content>
        </Tabs.Root>
      </Container>
    </main>
  )
}

export default App
