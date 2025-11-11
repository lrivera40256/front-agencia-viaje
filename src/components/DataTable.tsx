// components/DataTable.tsx
import { ColumnDef } from "../types/table.types";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  selectable?: boolean;
  rowKey?: (row: T) => string | number;
  selected?: T[];
  onSelectChange?: (selected: T[]) => void;
};

export const DataTable = <T,>({
  data,
  columns,
  selectable = false,
  rowKey = () => crypto.randomUUID(),
  selected = [],
  onSelectChange = () => {},
}: DataTableProps<T>) => {
  const handleToggle = (row: T) => {
    const exists = selected.includes(row);
    const newSelected = exists
      ? selected.filter((r) => r !== row)
      : [...selected, row];
    onSelectChange(newSelected);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50 border-b">
          <tr>
            {selectable && (
              <th className="px-4 py-2 text-left font-semibold text-gray-700"></th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-2 text-center font-semibold text-gray-700 ${
                  col.className ?? ""
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="text-center py-4 text-gray-500"
              >
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            data.map((row) => {
              const key = rowKey(row);
              const isSelected = selected.find((r) => rowKey(r) === key) !== undefined;

              return (
                <tr
                  key={key}
                  className={`border-b hover:bg-gray-50 transition ${
                    isSelected ? "bg-blue-50" : ""
                  }`}
                >
                  {selectable && (
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggle(row)}
                        className="h-4 w-4"
                      />
                    </td>
                  )}

                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-2 ">
                      {col.cell
                        ? col.cell(row)
                        : col.accessor
                        ? col.accessor(row)
                        : null}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
