import { type ColumnDef } from '@tanstack/react-table';

export interface GridProps<T> {
  payload?: {
    data: T[];
    total: number;
  };
  columns: ColumnDef<T>[];
}
