import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ListParams } from '../api/query-keys'
import type { CreateUserInput, User } from '../api/types'
import { useRoles } from '../hooks/useRoles'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from '../hooks/useUsers'
import { createEmptyUserTableModel, toUserTableModel } from '../tables'
import { Button, DeleteModal, SearchField, spacing, Table, UserFormModal, useToast } from '../ui'
import { Flex } from '@radix-ui/themes'

export function TabUser() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)
  const debouncedSearch = useDebouncedValue(search.trim(), 300)

  const listParams = useMemo<ListParams>(() => {
    const params: ListParams = { page }
    if (debouncedSearch) params.search = debouncedSearch
    return params
  }, [page, debouncedSearch])

  const usersQuery = useUsers(listParams)
  const rolesQuery = useRoles()
  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()

  const toast = useToast()

  const roles = useMemo(
    () => rolesQuery.data?.data.map((role) => ({ id: role.id, name: role.name })) ?? [],
    [rolesQuery.data?.data],
  )

  const getRoleName = useMemo(() => {
    const roleNames = new Map(
      rolesQuery.data?.data.map((role) => [role.id, role.name]) ?? [],
    )
    return (roleId: string) => roleNames.get(roleId) ?? roleId
  }, [rolesQuery.data?.data])

  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user)
  }, [])

  const handleDeleteUser = useCallback((user: User) => {
    setDeletingUser(user)
  }, [])

  const userTableModel = useMemo(() => {
    if (!usersQuery.data || !rolesQuery.data) return createEmptyUserTableModel()
    return toUserTableModel(
      usersQuery.data.data,
      getRoleName,
      (user) => [
        { label: 'Edit user', onSelect: () => handleEditUser(user) },
        { label: 'Delete user', onSelect: () => handleDeleteUser(user) },
      ],
    )
  }, [usersQuery.data, rolesQuery.data, getRoleName, handleEditUser, handleDeleteUser])

  const [prevSearch, setPrevSearch] = useState(debouncedSearch)
  if (debouncedSearch !== prevSearch) {
    setPrevSearch(debouncedSearch)
    setPage(1)
  }

  if (usersQuery.data && usersQuery.data.data.length === 0 && page > 1) {
    setPage(page - 1)
  }

  useEffect(() => {
    if (usersQuery.isError) {
      toast.open({ message: 'Failed to load users', type: 'error' })
    }
  }, [usersQuery.isError, usersQuery.error, toast])

  const handleCreateUser = (values: CreateUserInput) => {
    createUserMutation.mutate(values, {
      onSuccess: () => {
        setIsCreateModalOpen(false)
        toast.open({ message: 'User created successfully', type: 'success' })
      },
      onError: () => {
        toast.open({ message: 'Failed to create user', type: 'error' })
      },
    })
  }

  const handleUpdateUser = (values: CreateUserInput) => {
    if (!editingUser) return

    updateUserMutation.mutate(
      { id: editingUser.id, input: values },
      {
        onSuccess: () => {
          setEditingUser(null)
          toast.open({ message: 'User updated successfully', type: 'success' })
        },
        onError: () => {
          toast.open({ message: 'Failed to update user', type: 'error' })
        },
      },
    )
  }

  const handleConfirmDelete = () => {
    if (!deletingUser) return

    deleteUserMutation.mutate(deletingUser.id, {
      onSuccess: () => {
        setDeletingUser(null)
        toast.open({ message: 'User deleted successfully', type: 'success' })
      },
      onError: () => {
        toast.open({ message: 'Failed to delete user', type: 'error' })
      },
    })
  }

  return (
    <Flex direction="column" gap={spacing[5]} pt={spacing[5]}>
      <Flex align="center" gap={spacing[4]}>
        <Flex flexGrow="1">
          <SearchField value={search} onChange={setSearch} className="w-full" />
        </Flex>
        <Button
          variant="primary"
          icon="plus"
          disabled={roles.length === 0}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add user
        </Button>
      </Flex>
      <Table.DataTable
        variant="surface"
        model={userTableModel}
        isLoading={usersQuery.isFetching || rolesQuery.isLoading}
        pagination={
          usersQuery.data && usersQuery.data.pages > 1
            ? {
                hasPrevious: usersQuery.data.prev !== null,
                hasNext: usersQuery.data.next !== null,
                isLoading: usersQuery.isFetching,
                onPrevious: () => {
                  if (usersQuery.data?.prev) setPage(usersQuery.data.prev)
                },
                onNext: () => {
                  if (usersQuery.data?.next) setPage(usersQuery.data.next)
                },
              }
            : undefined
        }
      />
      <UserFormModal
        open={isCreateModalOpen}
        onOpenChange={(open) => {
          setIsCreateModalOpen(open)
          if (!open) createUserMutation.reset()
        }}
        mode="create"
        roles={roles}
        onSubmit={handleCreateUser}
        isSubmitting={createUserMutation.isPending}
      />
      <UserFormModal
        open={Boolean(editingUser)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingUser(null)
            updateUserMutation.reset()
          }
        }}
        mode="edit"
        user={editingUser ?? undefined}
        roles={roles}
        onSubmit={handleUpdateUser}
        isSubmitting={updateUserMutation.isPending}
      />
      <DeleteModal
        open={Boolean(deletingUser)}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingUser(null)
            deleteUserMutation.reset()
          }
        }}
        itemName={
          deletingUser ? `${deletingUser.first} ${deletingUser.last}` : 'this user'
        }
        title="Delete user"
        confirmLabel="Delete user"
        onConfirm={handleConfirmDelete}
        isConfirming={deleteUserMutation.isPending}
      />
    </Flex>
  )
}
