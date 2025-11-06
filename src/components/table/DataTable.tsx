import { TableAction, TableVariant } from "./types"

const btnBase =
  "inline-flex items-center rounded-md border text-xs font-medium h-8 px-3 transition-colors focus:ring-2 focus:ring-offset-1 shadow-sm"
const variants: Record<TableVariant, string> = {
  primary: "border-blue-600 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
  danger: "border-red-600 bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  neutral:
    "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400",
}

interface Props<T> {
  titles: string[]
  data: T[]
  actions?: TableAction<T>[]
  emptyMessage?: string
  renderCell?: (key: keyof T, value: any, row: T) => React.ReactNode
}

export function DataTable<T>({
  titles,
  data,
  actions,
  emptyMessage = "Sin datos",
  renderCell,
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              {titles.map((t) => (
                <th
                  key={t}
                  className="px-5 py-3 text-[11px] font-semibold text-slate-600 uppercase"
                >
                  {t}
                </th>
              ))}
              {actions?.length && (
                <th className="px-5 py-3 text-[11px] font-semibold text-slate-600 uppercase text-right">
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          <tbody className="text-sm">
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={titles.length + (actions?.length ? 1 : 0)}
                  className="px-5 py-14 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {data.map((row, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-slate-50 px-5 border-b border-slate-100 hover:bg-blue-50 transition-colors"
              >
                {Object.entries(row).map(([k, v]) =>
                  k === '_id' ? null : (
                    <td className="px-5 py-3 align-middle" key={k}>{v}</td>
                  )
                )}

                {actions && actions.length > 0 && (
                  <td className="px-5 py-3 align-middle">
                    <div className="flex justify-end gap-2">
                      {actions.map((a, i) => (
                        <button
                          key={i}
                          onClick={() => a.onClick(row)}
                          className={`${btnBase} ${variants[a.variant || "neutral"]}`}
                        >
                          {a.icon && <a.icon className="h-3.5 w-3.5 mr-1" />}
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
