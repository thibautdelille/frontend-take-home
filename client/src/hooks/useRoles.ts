import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { roleKeys, userKeys, type ListParams } from '../api/query-keys'
import { createRole, deleteRole, getRole, getRoles, updateRole } from '../api/roles'
import type { CreateRoleInput, UpdateRoleInput } from '../api/types'

export function useRoles(params?: ListParams) {
  return useQuery({
    queryKey: roleKeys.list(params),
    queryFn: () => getRoles(params),
  })
}

export function useRole(id: string) {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: () => getRole(id),
    enabled: Boolean(id),
  })
}

export function useCreateRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateRoleInput) => createRole(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() })
    },
  })
}

export function useUpdateRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateRoleInput }) =>
      updateRole(id, input),
    onSuccess: (role) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.setQueryData(roleKeys.detail(role.id), role)
    },
  })
}

export function useDeleteRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}
