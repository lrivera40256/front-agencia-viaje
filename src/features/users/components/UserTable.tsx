import { Table } from "@/components/table/Table"
import { User } from "../types/User"

export interface UserTableProps {
  users: User[]
  loading?: boolean
  onAdd: () => void
  onDelete: (user: User) => void | Promise<void>
  onEdit?: (user: User) => void
  onSearch?: (q: string) => void
  onRoleClick: (user: User) => void
}

export function UserTable({
  users,
  loading,
  onAdd,
  onDelete,
  onEdit,
  onSearch,
  onRoleClick,
}: UserTableProps) {
  const actions = [
    ...(onEdit
      ? [
          {
            label: "Editar",
            variant: "primary" as const,
            onClick: onEdit,
          },
        ]
      : []),
    {
      label: "Eliminar",
      variant: "danger" as const,
      onClick: onDelete,
    },
    {
      label: "Roles",
      variant: "neutral" as const,
      onClick: onRoleClick,
    },
  ]

  return (
    <Table
      tableName="Usuarios"
      titles={["Nombre", "Email"]}
      data={users}
      actions={actions}
      onAdd={onAdd}
      search={
        onSearch
          ? {
              onSearch,
              placeholder: "Buscar usuario...",
              debounceMs: 400,
              hideButton: true,
            }
          : undefined
      }
      emptyMessage={loading ? "Cargando..." : "No hay usuarios"}
    />
  )
}
