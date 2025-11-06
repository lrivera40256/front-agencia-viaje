import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import type { SearchOptions } from "./types"

interface Props {
  tableName: string
  onAdd?: () => void
  search?: SearchOptions
}

export function TableHeader({ tableName, onAdd, search }: Props) {
  const [query, setQuery] = useState(search?.initialQuery ?? "")

  useEffect(() => {
    if (!search?.debounceMs) return
    const id = setTimeout(() => search.onSearch(query.trim()), search.debounceMs)
    return () => clearTimeout(id)
  }, [query])

  const runSearch = () => search?.onSearch(query.trim())

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-center gap-2">
        <span className="h-5 w-1.5 rounded bg-blue-600" />
        <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
          {tableName}
        </h2>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        {search && (
          <div className="flex items-center gap-2">
            <div className="flex items-stretch h-9">
              <input
                type="text"
                placeholder={search.placeholder || "Buscar..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                className="h-full rounded-l-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {!search.hideButton && (
                <button
                  type="button"
                  onClick={runSearch}
                  className="h-full rounded-r-md bg-blue-600 px-3 text-white text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 flex items-center gap-1"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 h-9 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-600"
          >
            + Agregar
          </button>
        )}
      </div>
    </div>
  )
}
