import { Table } from "@/components/table/Table";
import type { BankCard } from "@/features/bank-cards/types/BankCard";

export interface BankCardTableProps {
  cards: BankCard[];
  loading?: boolean;
  onAdd: () => void;
  onDelete: (card: BankCard) => void | Promise<void>;
  onEdit?: (card: BankCard) => void;
  onSearch?: (q: string) => void;
}

export function BankCardTable({
  cards,
  loading,
  onAdd,
  onDelete,
  onEdit,
  onSearch,
}: BankCardTableProps) {
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
      tableName="Tarjetas Bancarias"
      titles={["Titular", "Tipo", "Proveedor", "Número"]}
      data={cards.map(({ customer_id, is_default,cvv,expiration_date,status,...rest }) => rest)}
      actions={actions}
      onAdd={onAdd}
      search={
        onSearch
          ? {
              onSearch,
              placeholder: "Buscar tarjeta...",
              debounceMs: 400,
              hideButton: true,
            }
          : undefined
      }
      emptyMessage={loading ? "Cargando..." : "No hay tarjetas"}
    />
  );
}

export default BankCardTable;
