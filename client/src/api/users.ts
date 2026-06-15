import { apiFetch } from './client'
import type { CreateUserInput, PagedData, UpdateUserInput, User } from './types'
import type { ListParams } from './query-keys'

function buildQuery(params?: ListParams) {
  const query = new URLSearchParams()
  if (params?.page) query.set('page', String(params.page))
  if (params?.search) query.set('search', params.search)

  const suffix = query.toString()
  return suffix ? `?${suffix}` : ''
}

export function getUsers(params?: ListParams) {
  return apiFetch<PagedData<User>>(`/users${buildQuery(params)}`)
}

export function getUser(id: string) {
  return apiFetch<User>(`/users/${id}`)
}

export function createUser(input: CreateUserInput) {
  return apiFetch<User>('/users', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function updateUser(id: string, input: UpdateUserInput) {
  return apiFetch<User>(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export function deleteUser(id: string) {
  return apiFetch<User>(`/users/${id}`, { method: 'DELETE' })
}
