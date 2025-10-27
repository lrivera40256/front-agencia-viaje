import { LucideIcon } from "lucide-react"

export type TableVariant = "primary" | "danger" | "neutral"

export interface TableAction<T> {
  label: string
  icon?: LucideIcon
  variant?: TableVariant
  onClick: (row: T) => void | Promise<void>
}

export interface SearchOptions {
  onSearch: (query: string) => void
  placeholder?: string
  debounceMs?: number
  hideButton?: boolean
  initialQuery?: string
}

export interface TableProps<T> {
  tableName: string
  titles: string[]
  data: T[]
  actions?: TableAction<T>[]
  onAdd?: () => void
  emptyMessage?: string
  className?: string
  search?: SearchOptions
  renderCell?: (key: keyof T, value: any, row: T) => React.ReactNode
}
