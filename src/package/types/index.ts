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

/**
 * Props for the `Grid` component.
 *
 * `Grid` is a reusable, feature-rich data-table component built on top of
 * `@tanstack/react-table`. It supports sorting, filtering, pagination,
 * column/row pinning, column resizing, row selection, and row expansion
 * out of the box.
 *
 * @typeParam T - The shape of a single row of data.
 *
 * @example
 * Basic usage with local state via `useGridState`:
 * ```tsx
 * import { Grid, useGridState, type ColumnDef } from 'munza-x-data-grid';
 *
 * interface User {
 *   id: string;
 *   name: string;
 * }
 *
 * const columns: ColumnDef<User>[] = [
 *   { id: 'id', accessorKey: 'id', header: () => 'ID' },
 *   { id: 'name', accessorKey: 'name', header: () => 'Name' },
 * ];
 *
 * const App = () => {
 *   const { state, handlers } = useGridState();
 *
 *   return (
 *     <Grid
 *       payload={{ data: users, total: users.length }}
 *       columns={columns}
 *       state={state}
 *       {...handlers}
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * Server-side (manual) pagination, sorting, and filtering:
 * ```tsx
 * const { state, handlers } = useGridState();
 * const { pagination, queryParams, sort, globalFilter } = useQueryArgs(state);
 * const { data, isLoading, isError, refetch, isFetching } = useUsersQuery({
 *   pagination,
 *   queryParams,
 *   sort,
 *   globalFilter,
 * });
 *
 * <Grid
 *   payload={{ data: data?.rows ?? [], total: data?.total ?? 0 }}
 *   columns={columns}
 *   manualPagination
 *   isLoading={isLoading}
 *   isError={isError}
 *   isFetching={isFetching}
 *   refetch={refetch}
 *   state={state}
 *   {...handlers}
 * />
 * ```
 */
export interface GridProps<T> {
  /**
   * The row data to render, plus the total row count (used for
   * server-side/manual pagination to compute total pages).
   *
   * @example
   * ```tsx
   * payload={{ data: users, total: 128 }}
   * ```
   */
  payload?: {
    data: T[];
    total: number;
  };

  /**
   * Column definitions for the table. Required.
   *
   * @example
   * ```tsx
   * const columns: ColumnDef<User>[] = [
   *   {
   *     id: 'email',
   *     accessorKey: 'email',
   *     header: () => <div>Email</div>,
   *     meta: { filterVariant: 'text' },
   *   },
   * ];
   * ```
   */
  columns: ColumnDef<T>[];

  /**
   * The current table state (filters, pagination, sorting, selection,
   * global filter, etc.), typically supplied by `useGridState`.
   *
   * @example
   * ```tsx
   * const { state } = useGridState();
   * <Grid state={state} ... />
   * ```
   */
  state?: Partial<TableState>;

  /**
   * Callback fired when column filters change.
   *
   * @example
   * ```tsx
   * onColumnFiltersChange={(updater) => setColumnFilters(updater)}
   * ```
   */
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;

  /**
   * Callback fired when pagination (page index or page size) changes.
   *
   * @example
   * ```tsx
   * onPaginationChange={(updater) => setPagination(updater)}
   * ```
   */
  onPaginationChange?: OnChangeFn<PaginationState>;

  /**
   * Callback fired when column sorting changes.
   *
   * @example
   * ```tsx
   * onSortingChange={(updater) => setSorting(updater)}
   * ```
   */
  onSortingChange?: OnChangeFn<SortingState>;

  /**
   * Callback fired when row selection changes.
   *
   * @example
   * ```tsx
   * onRowSelectionChange={(updater) => setRowSelection(updater)}
   * ```
   */
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  /**
   * Setter for the global (cross-column) search/filter text.
   *
   * @example
   * ```tsx
   * const [globalFilter, setGlobalFilter] = useState('');
   * <Grid setGlobalFilter={setGlobalFilter} ... />
   * ```
   */
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Enables server-side (manual) pagination. When `true`, the table will
   * not paginate `payload.data` itself and instead relies on `payload.total`
   * and your `onPaginationChange` handler to fetch the correct page.
   *
   * @defaultValue `false`
   *
   * @example
   * ```tsx
   * <Grid manualPagination={true} payload={{ data: pageOfUsers, total: 500 }} ... />
   * ```
   */
  manualPagination?: boolean;

  /**
   * Shows a loading state (e.g. skeleton rows) while data is being fetched.
   *
   * @example
   * ```tsx
   * <Grid isLoading={isPending} ... />
   * ```
   */
  isLoading?: boolean;

  /**
   * Shows an error state, typically when a data-fetch request has failed.
   *
   * @example
   * ```tsx
   * <Grid isError={isError} ... />
   * ```
   */
  isError?: boolean;

  /**
   * Indicates a background refetch is in progress (distinct from the
   * initial `isLoading` state), useful for showing a subtle refresh
   * indicator without blocking the existing rows.
   *
   * @example
   * ```tsx
   * <Grid isFetching={isFetching} ... />
   * ```
   */
  isFetching?: boolean;

  /**
   * Function to manually re-trigger a data fetch, e.g. from a "Retry"
   * button on the error state or a refresh action in the toolbar.
   *
   * @example
   * ```tsx
   * <Grid refetch={() => queryClient.refetchQueries(['users'])} ... />
   * ```
   */
  refetch?: () => void;

  /**
   * Renders custom content inside an expanded row (used together with
   * `getRowCanExpand`).
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
   * Determines whether a given row can be expanded to show
   * `renderSubComponent`.
   *
   * @example
   * ```tsx
   * getRowCanExpand={(row) => row.original.subRows?.length > 0}
   * ```
   */
  getRowCanExpand?: (row: Row<T>) => boolean;

  /**
   * Enables or disables row selection (checkbox column and related
   * selection APIs).
   *
   * @defaultValue `true`
   *
   * @example
   * ```tsx
   * <Grid enableRowSelection={false} ... />
   * ```
   */
  enableRowSelection?: boolean;

  /**
   * Fixed height for the table's scrollable body, as a CSS value.
   *
   * @defaultValue `'65vh'`
   *
   * @example
   * ```tsx
   * <Grid height="480px" ... />
   * ```
   */
  height?: string;

  /**
   * Whether to render the built-in toolbar (column visibility, density,
   * global search, split view, etc.) above the table.
   *
   * @defaultValue `true`
   *
   * @example
   * ```tsx
   * <Grid isToolbar={false} ... />
   * ```
   */
  isToolbar?: boolean;

  /**
   * Whether to render the built-in pagination controls below the table.
   *
   * @defaultValue `true`
   *
   * @example
   * ```tsx
   * <Grid isPagination={false} ... />
   * ```
   */
  isPagination?: boolean;

  /**
   * A unique name for this grid instance, used as a storage key to persist
   * per-grid state (column visibility, pinning, order, sizing, split view)
   * across sessions. Use a distinct name per grid instance in your app.
   *
   * @defaultValue `'munza'`
   *
   * @example
   * ```tsx
   * <Grid name="users-grid" ... />
   * ```
   */
  name?: string;

  /**
   * Additional content rendered inside the grid wrapper, above the table
   * (e.g. custom banners, alerts, or bulk-action bars tied to selection).
   *
   * @example
   * ```tsx
   * <Grid ...>
   *   {rowSelection && Object.keys(rowSelection).length > 0 && (
   *     <BulkActionsBar selection={rowSelection} />
   *   )}
   * </Grid>
   * ```
   */
  children?: ReactNode;
}
