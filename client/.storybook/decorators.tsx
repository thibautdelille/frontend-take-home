import type { Decorator } from '@storybook/react-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { roleKeys, userKeys } from '../src/api/query-keys'
import type { PagedData, Role, User } from '../src/api/types'

const mockUsers: User[] = [
  {
    id: '1',
    createdAt: '2024-08-27T23:16:10.554Z',
    updatedAt: '2024-09-03T23:16:10.554Z',
    first: 'Mark',
    last: 'Tipton',
    roleId: 'role-1',
  },
  {
    id: '2',
    createdAt: '2024-07-16T23:16:10.554Z',
    updatedAt: '2024-08-27T23:16:10.554Z',
    first: 'Jennifer',
    last: 'Todd',
    roleId: 'role-2',
  },
]

const mockRoles: Role[] = [
  {
    id: 'role-1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    name: 'Admin',
    isDefault: false,
  },
  {
    id: 'role-2',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    name: 'Member',
    isDefault: true,
  },
]

function createPagedData<T>(data: T[]): PagedData<T> {
  return { data, next: null, prev: null, pages: 1 }
}

export function withQueryData(): Decorator {
  return (Story) => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })

    queryClient.setQueryData(userKeys.list(), createPagedData(mockUsers))
    queryClient.setQueryData(roleKeys.list(), createPagedData(mockRoles))

    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  }
}
