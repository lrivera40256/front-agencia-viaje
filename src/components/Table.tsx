import React from "react";

interface TableAction<T = any> {
  label: string;
  onClick: (row: T) => Promise<void> | void;
  variant?: "primary" | "danger" | "neutral";
}

interface TableProps {
  tableName: string;
  titles: string[];
  data: Record<string, any>[];
  actions?: TableAction[];
  onAdd?: () => void;
  emptyMessage?: string;
  className?: string;
}

const btnBase =
  "inline-flex items-center rounded-md border text-xs font-medium h-8 px-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 shadow-sm";
const variants: Record<string,string> = {
  primary: "border-blue-600 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
  danger: "border-red-600 bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  neutral: "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400"
};

const Table: React.FC<TableProps> = ({
  tableName,
  titles,
  data,
  actions,
  onAdd,
  emptyMessage = "No hay datos disponibles",
  className = ""
}) => {
  return (
    <div className={`space-y-5 ${className}`}>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-5 w-1.5 rounded bg-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
              {tableName}
            </h2>
          </div>
         
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 h-9 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
          >
            + Agregar
          </button>
        )}
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200">
                {titles.map(t => (
                  <th
                    key={t}
                    className="px-5 py-3 text-[11px] font-semibold tracking-wide text-slate-600 uppercase"
                  >
                    {t}
                  </th>
                ))}
                {actions?.length ? (
                  <th className="px-5 py-3 text-[11px] font-semibold tracking-wide text-slate-600 uppercase text-right">
                    Acciones
                  </th>
                ) : null}
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

              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`
                    odd:bg-white even:bg-slate-50/60
                    border-b last:border-b-0 border-slate-100
                    hover:bg-blue-50/60 transition-colors
                  `}
                >
                  {Object.entries(row).map(([k, v], cellIndex) =>
                    k === "_id" ? null : (
                      <td key={k} className="px-5 py-3 align-middle">
                        {cellIndex === 0 ? (
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-semibold shadow-sm">
                              {String(v).charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-slate-800">
                              {String(v)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-600">
                            {String(v) || "—"}
                          </span>
                        )}
                      </td>
                    )
                  )}

                  {actions?.length ? (
                    <td className="px-5 py-3 align-middle">
                      <div className="flex justify-end gap-2">
                        {actions.map((a, i) => (
                          <button
                            key={i}
                            onClick={() => a.onClick(row)}
                            className={`${btnBase} ${variants[a.variant || "neutral"]}`}
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Table;