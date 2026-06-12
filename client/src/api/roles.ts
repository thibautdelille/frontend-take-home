import { apiFetch } from './client'
import type { CreateRoleInput, PagedData, Role, UpdateRoleInput } from './types'
import type { ListParams } from './query-keys'

function buildQuery(params?: ListParams) {
  const query = new URLSearchParams()
  if (params?.page) query.set('page', String(params.page))
  if (params?.search) query.set('search', params.search)

  const suffix = query.toString()
  return suffix ? `?${suffix}` : ''
}

export function getRoles(params?: ListParams) {
  return apiFetch<PagedData<Role>>(`/roles${buildQuery(params)}`)
}

export function getRole(id: string) {
  return apiFetch<Role>(`/roles/${id}`)
}

export function createRole(input: CreateRoleInput) {
  return apiFetch<Role>('/roles', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function updateRole(id: string, input: UpdateRoleInput) {
  return apiFetch<Role>(`/roles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export function deleteRole(id: string) {
  return apiFetch<Role>(`/roles/${id}`, { method: 'DELETE' })
}
