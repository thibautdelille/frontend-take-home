import { Flex } from '@radix-ui/themes'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CreateRoleInput, Role } from '../api/types'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import {
  useCreateRole,
  useDeleteRole,
  useRoles,
  useUpdateRole,
} from '../hooks/useRoles'
import { createEmptyRoleTableModel, toRoleTableModel } from '../tables'
import { Button, DeleteModal, RoleFormModal, SearchField, spacing, Table, useToast } from '../ui'

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

export function TabRole() {
  const [search, setSearch] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [deletingRole, setDeletingRole] = useState<Role | null>(null)
  const debouncedSearch = useDebouncedValue(search.trim(), 300)

  const rolesQuery = useRoles(
    debouncedSearch ? { search: debouncedSearch } : undefined,
  )
  const createRoleMutation = useCreateRole()
  const updateRoleMutation = useUpdateRole()
  const deleteRoleMutation = useDeleteRole()
  const toast = useToast()

  const handleEditRole = useCallback((role: Role) => {
    setEditingRole(role)
  }, [])

  const handleDeleteRole = useCallback((role: Role) => {
    setDeletingRole(role)
  }, [])

  const roleTableModel = useMemo(() => {
    if (!rolesQuery.data) return createEmptyRoleTableModel()

    return toRoleTableModel(
      rolesQuery.data.data,
      (role) => [
        { label: 'Edit role', onSelect: () => handleEditRole(role) },
        ...(!role.isDefault
          ? [{ label: 'Delete role', onSelect: () => handleDeleteRole(role) }]
          : []),
      ],
    )
  }, [rolesQuery.data, handleEditRole, handleDeleteRole])

  useEffect(() => {
    if (rolesQuery.isError) {
      toast.open({
        message: getErrorMessage(rolesQuery.error, 'Failed to load roles'),
        type: 'error',
      })
    }
  }, [rolesQuery.isError, rolesQuery.error, toast])

  const handleCreateRole = (values: CreateRoleInput) => {
    createRoleMutation.mutate(values, {
      onSuccess: () => {
        setIsCreateModalOpen(false)
        toast.open({ message: 'Role created successfully', type: 'success' })
      },
      onError: (error) => {
        toast.open({
          message: getErrorMessage(error, 'Failed to create role'),
          type: 'error',
        })
      },
    })
  }

  const handleUpdateRole = (values: CreateRoleInput) => {
    if (!editingRole) return

    updateRoleMutation.mutate(
      { id: editingRole.id, input: values },
      {
        onSuccess: () => {
          setEditingRole(null)
          toast.open({ message: 'Role updated successfully', type: 'success' })
        },
        onError: (error) => {
          toast.open({
            message: getErrorMessage(error, 'Failed to update role'),
            type: 'error',
          })
        },
      },
    )
  }

  const handleConfirmDelete = () => {
    if (!deletingRole) return

    deleteRoleMutation.mutate(deletingRole.id, {
      onSuccess: () => {
        setDeletingRole(null)
        toast.open({ message: 'Role deleted successfully', type: 'success' })
      },
      onError: (error) => {
        toast.open({
          message: getErrorMessage(error, 'Failed to delete role'),
          type: 'error',
        })
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
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add role
        </Button>
      </Flex>
      <Table.DataTable
        variant="surface"
        model={roleTableModel}
        isLoading={rolesQuery.isFetching}
      />
      <RoleFormModal
        open={isCreateModalOpen}
        onOpenChange={(open) => {
          setIsCreateModalOpen(open)
          if (!open) createRoleMutation.reset()
        }}
        mode="create"
        onSubmit={handleCreateRole}
        isSubmitting={createRoleMutation.isPending}
      />
      <RoleFormModal
        open={Boolean(editingRole)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingRole(null)
            updateRoleMutation.reset()
          }
        }}
        mode="edit"
        role={editingRole ?? undefined}
        onSubmit={handleUpdateRole}
        isSubmitting={updateRoleMutation.isPending}
      />
      <DeleteModal
        open={Boolean(deletingRole)}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingRole(null)
            deleteRoleMutation.reset()
          }
        }}
        itemName={deletingRole?.name ?? 'this role'}
        title="role"
        confirmLabel="Delete role"
        onConfirm={handleConfirmDelete}
        isConfirming={deleteRoleMutation.isPending}
      />
    </Flex>
  )
}
