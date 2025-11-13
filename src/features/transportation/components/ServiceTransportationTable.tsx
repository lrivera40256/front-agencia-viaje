import { Table } from "@/components/table/Table";
import type { ServiceTransportation } from "@/features/transportation/types/ServiceTransportation";

interface Props {
  items: ServiceTransportation[];
  loading?: boolean;
  onAdd: () => void;
  onEdit: (row: ServiceTransportation) => void;
  onDelete: (row: ServiceTransportation) => void | Promise<void>;
}

export function ServiceTransportationTable({ items, loading, onAdd, onEdit, onDelete }: Props) {
  const actions = [
    { label: "Editar", variant: "primary" as const, onClick: onEdit },
    { label: "Eliminar", variant: "danger" as const, onClick: onDelete },
  ];

  const rows = items.map((s) => ({
    start_date: s.start_date,
    end_date: s.end_date,
    cost: s.cost,
    transportation_id: s.transportation_id,
    journey_id: s.journey_id,
    id: s.id,
  }));

  return (
    <Table
      tableName="Servicios de Transporte"
      titles={["Inicio", "Fin", "Costo", "Transporte", "Trayecto"]}
      data={rows as any}
      actions={actions as any}
      onAdd={onAdd}
      emptyMessage={loading ? "Cargando..." : "Sin servicios"}
    />
  );
}

export default ServiceTransportationTable;
