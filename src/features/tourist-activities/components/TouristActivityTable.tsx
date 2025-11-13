import { Table } from "@/components/table/Table";
import type { TouristActivity } from "@/features/tourist-activities/types/TouristActivity";

export interface TouristActivityTableProps {
  activities: TouristActivity[];
  loading?: boolean;
  onAdd: () => void;
  onDelete: (activity: TouristActivity) => void | Promise<void>;
  onEdit?: (activity: TouristActivity) => void;
  onSearch?: (q: string) => void;
}

export function TouristActivityTable({
  activities,
  loading,
  onAdd,
  onDelete,
  onEdit,
  onSearch,
}: TouristActivityTableProps) {
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
  ];

  return (
    <Table
      tableName="Actividades Turísticas"
      titles={["Nombre","Descripción", "Ciudad", "Precio","Activo"]}
      data={activities}
      actions={actions}
      onAdd={onAdd}
      search={
        onSearch
          ? {
              onSearch,
              placeholder: "Buscar actividad...",
              debounceMs: 400,
              hideButton: true,
            }
          : undefined
      }
      emptyMessage={loading ? "Cargando..." : "No hay actividades"}
    />
  );
}

export default TouristActivityTable;
