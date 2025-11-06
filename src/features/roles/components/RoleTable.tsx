import { Table } from "@/components/table/Table"
import type { Role } from "../types/role.types"

export interface RoleTableProps {
  tableName: string
  roles: Role[]
  loading?: boolean

  // acciones
  onAdd: () => void
  onDelete: (role: Role) => void | Promise<void>
  onEdit?: (role: Role) => void

  // búsqueda
  onSearch?: (q: string) => void
}

export function RoleTable({
  tableName,
  roles,
  loading,
  onAdd,
  onDelete,
  onEdit,
  onSearch,
}: RoleTableProps) {
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
  ]

  return (
    <Table
      tableName={tableName}
      titles={["Nombre", "Descripción"]}
      data={roles}
      actions={actions}
      onAdd={onAdd}
      search={
        onSearch
          ? {
              onSearch,
              placeholder: "Buscar rol...",
              debounceMs: 400,
              hideButton: true,
            }
          : undefined
      }
      emptyMessage={loading ? "Cargando..." : "No hay roles"}
    />
  )
}
