import type { PagedData, Role, User } from './types'

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function fetchUsers() {
  return fetchJson<PagedData<User>>('/users')
}

export function fetchRoles() {
  return fetchJson<PagedData<Role>>('/roles')
}
