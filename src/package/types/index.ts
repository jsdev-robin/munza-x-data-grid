import type {
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table';
import { type ColumnDef, type TableState } from '@tanstack/react-table';
import type { ReactNode } from 'react';

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
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  manualPagination?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  refetch?: () => void;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  getRowCanExpand?: (row: Row<T>) => boolean;
  enableRowSelection?: boolean;
  height?: string;
  isToolbar?: boolean;
  isPagination?: boolean;
  name?: string;
  children?: ReactNode;
}
