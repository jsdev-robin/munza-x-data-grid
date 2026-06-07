import {
  ColumnDef,
  RowData,
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type TableState,
} from '@tanstack/react-table';
import type React from 'react';

/**
 * Extends TanStack Table's `ColumnMeta` to support built-in filter input variants.
 *
 * @example
 * ```tsx
 * {
 *   accessorKey: 'name',
 *   header: 'Name',
 *   meta: { filterVariant: 'text' },
 * }
 * ```
 */
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /**
     * Determines the type of filter input rendered for this column.
     *
     * | Value              | Description                        |
     * |--------------------|------------------------------------|
     * | `text`             | Plain text input                   |
     * | `number`           | Numeric input                      |
     * | `tel`              | Telephone number input             |
     * | `url`              | URL input                          |
     * | `color`            | Color picker                       |
     * | `range`            | Range slider                       |
     * | `select`           | Dropdown select                    |
     * | `dateRange`        | Date range picker                  |
     * | `date`             | Single date picker                 |
     * | `datetime-local`   | Date and time picker               |
     * | `month`            | Month picker                       |
     * | `time`             | Time picker                        |
     * | `week`             | Week picker                        |
     */
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

/**
 * Props for the `<Grid />` component.
 *
 * `T` represents the shape of a single row of data.
 *
 * @example
 * ```tsx
 * interface User {
 *   id: string;
 *   name: string;
 *   email: string;
 * }
 *
 * <Grid<User>
 *   payload={{ data: users, total: 100 }}
 *   columns={columns}
 *   state={state}
 *   manualPagination
 *   onPaginationChange={setPagination}
 *   onRowSelectionChange={setRowSelection}
 * />
 * ```
 */
export interface GridProps<T> {
  /**
   * The data to display in the grid.
   *
   * - `data` — array of row objects
   * - `total` — total record count (used for server-side pagination)
   *
   * @example
   * ```tsx
   * payload={{ data: users, total: 200 }}
   * ```
   */
  payload?: {
    data: T[];
    total: number;
  };

  /**
   * Column definitions following TanStack Table's `ColumnDef` API.
   * Supports `accessorKey`, `accessorFn`, custom `cell` renderers, and `meta.filterVariant`.
   *
   * @example
   * ```tsx
   * const columns: ColumnDef<User>[] = [
   *   { accessorKey: 'name', header: 'Name', meta: { filterVariant: 'text' } },
   *   { accessorKey: 'email', header: 'Email' },
   * ];
   * ```
   */
  columns: ColumnDef<T>[];

  /**
   * Controlled table state. Pass values from `useGridState()` or your own state.
   * Supports pagination, sorting, column filters, global filter, and row selection.
   *
   * @example
   * ```tsx
   * const { state, handlers } = useGridState();
   * <Grid state={state} {...handlers} />
   * ```
   */
  state?: Partial<TableState>;

  /**
   * Callback fired when column filters change.
   * Wire this to `setColumnFilters` from `useGridState()`.
   */
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;

  /**
   * Callback fired when the page index or page size changes.
   * Wire this to `setPagination` from `useGridState()`.
   *
   * Required when `manualPagination` is `true`.
   */
  onPaginationChange?: OnChangeFn<PaginationState>;

  /**
   * Callback fired when column sorting changes.
   * Wire this to `setSorting` from `useGridState()`.
   */
  onSortingChange?: OnChangeFn<SortingState>;

  /**
   * Callback fired when row selection changes.
   * Wire this to `setRowSelection` from `useGridState()`.
   *
   * @example
   * ```tsx
   * const { state, handlers, rowSelection } = useGridState();
   *
   * // Get selected IDs
   * const selectedIds = Object.keys(rowSelection).filter(k => rowSelection[k]);
   * ```
   */
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  /**
   * Setter for the global search/filter string.
   * Wire this to `setGlobalFilter` from `useGridState()`.
   */
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;

  /**
   * When `true`, the grid will not handle pagination internally.
   * You are responsible for fetching the correct page of data based on `state.pagination`.
   *
   * @default false
   */
  manualPagination?: boolean;

  /**
   * When `true`, displays a loading skeleton overlay over the grid.
   */
  isLoading?: boolean;

  /**
   * When `true`, displays an error state in the grid.
   */
  isError?: boolean;

  /**
   * When `true`, shows a subtle loading indicator (e.g. during background refetches)
   * without fully blocking the grid UI.
   */
  isFetching?: boolean;

  /**
   * Optional callback to manually trigger a data refetch.
   * Typically passed from a React Query or SWR `refetch` function.
   */
  refetch?: () => void;

  /**
   * Renders an expandable sub-row beneath a parent row.
   * Must be used together with `getRowCanExpand`.
   *
   * @example
   * ```tsx
   * renderSubComponent={({ row }) => (
   *   <pre>{JSON.stringify(row.original, null, 2)}</pre>
   * )}
   * ```
   */
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;

  /**
   * Determines whether a given row can be expanded.
   * Return `true` to allow expansion for that row.
   *
   * @example
   * ```tsx
   * getRowCanExpand={(row) => row.original.subRows?.length > 0}
   * ```
   */
  getRowCanExpand?: (row: Row<T>) => boolean;

  /**
   * When `true`, enables row selection checkboxes.
   * Use with `onRowSelectionChange` to track selected rows.
   *
   * @default false
   */
  enableRowSelection?: boolean;
}