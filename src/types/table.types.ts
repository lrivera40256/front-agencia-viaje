export interface ColumnDef<T> {
  key: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  cell?: (row: T) => React.ReactNode;
  className?: string;
}
