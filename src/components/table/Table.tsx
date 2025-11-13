import type { TableProps } from "./types"
import { TableHeader } from "./TableHeader"
import { DataTable } from "./DataTable"

export function Table<T>({
  tableName,
  titles,
  data,
  actions,
  onAdd,
  emptyMessage,
  className,
  search,
  renderCell,
}: TableProps<T>) {
  return (
    <div className={`space-y-5 ${className || ""}`}>
      <TableHeader tableName={tableName} onAdd={onAdd} search={search} />

      {/* wrapper con scroll horizontal */}
      <div className="w-full overflow-x-auto">
        {/* este inline-block permite que la tabla tenga un ancho mínimo mayor al del contenedor */}
        <div className="inline-block min-w-full align-middle">
          <DataTable
            titles={titles}
            data={data}
            actions={actions}
            emptyMessage={emptyMessage}
            renderCell={renderCell}
          />
        </div>
      </div>
    </div>
  )
}
