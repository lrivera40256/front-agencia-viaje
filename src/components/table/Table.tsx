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
      <DataTable
        titles={titles}
        data={data}
        actions={actions}
        emptyMessage={emptyMessage}
        renderCell={renderCell}
      />
    </div>
  )
}

export default Table
