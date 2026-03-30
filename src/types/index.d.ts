import {
  ColumnDef,
  RowData,
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  type TableState,
} from '@tanstack/react-table';
import type React from 'react';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?:
      | 'text'
      | 'number'
      | 'tel'
      | 'url'
      | 'color'
      | 'range'
      | 'select'
      | 'dateRange'
      | 'date'
      | 'datetime-local'
      | 'month'
      | 'time'
      | 'week';
  }
}

export interface GridProps<T> {
  payload?: {
    data: T[];
    total: number;
  };
  columns: ColumnDef<T>[];
  state?: Partial<TableState>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onSortingChange?: OnChangeFn<SortingState>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  manualPagination?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}
