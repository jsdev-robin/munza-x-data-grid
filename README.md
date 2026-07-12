# Grid Component — Usage Guide

`Grid` is a reusable data-table component built on top of `@tanstack/react-table`, with built-in support for sorting, filtering, pagination, column pinning, row pinning, column resizing, and more.

## 1. Installation

```bash
npm install munza-x-data-grid
# or
yarn add munza-x-data-grid
# or
pnpm add munza-x-data-grid
```

**Peer dependencies** (must already be installed in your project):

```bash
npm install react@^18 || ^19 react-dom@^18 || ^19
```

### Importing the stylesheet

The package ships with a CSS file that needs to be imported once at your app's entry point (e.g. `main.tsx` or `App.tsx`):

```tsx
import 'munza-x-data-grid/style.css';
```

### Imports

Everything — components, hooks, utilities, and types — is exported from the single package entry point:

```tsx
import {
  Grid,
  useGridState,
  useQueryArgs,
  URLSearch,
  type ColumnDef,
} from 'munza-x-data-grid';
```

> Note: if you're importing from a local source within the same repo (monorepo / linked package), the path may differ, e.g. `./package` or `../package`.

## 2. Basic Usage

```tsx
import { useMemo } from 'react';
import { Grid, useGridState, type ColumnDef } from 'munza-x-data-grid';

const App = () => {
  const columns = useMemo<ColumnDef<MyDataType, unknown>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: () => <div>ID</div>,
        cell: (info) => info.getValue(),
        meta: { filterVariant: 'text' },
        enableHiding: false,
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: () => <div>Name</div>,
        cell: (info) => info.getValue(),
        meta: { filterVariant: 'text' },
      },
    ],
    [],
  );

  const { state, handlers } = useGridState();

  return (
    <Grid
      payload={{ data: myData, total: 0 }}
      columns={columns}
      isLoading={false}
      isError={false}
      manualPagination={true}
      state={state}
      {...handlers}
    />
  );
};

export default App;
```

## 3. The `useGridState` Hook

Use this hook to manage all table state (`columnFilters`, `pagination`, `sorting`, `rowSelection`, `globalFilter`) and their change handlers in one place.

```tsx
const { state, handlers, rowSelection } = useGridState();

<Grid
  columns={columns}
  payload={{ data, total }}
  state={state}
  {...handlers}
/>;
```

`handlers` includes:

- `onColumnFiltersChange`
- `onPaginationChange`
- `onSortingChange`
- `setGlobalFilter`
- `onRowSelectionChange`

You can also use pieces separately, e.g. tracking selected rows via `rowSelection`:

```tsx
console.log(rowSelection);
```

## 4. `Grid` Component Props

| Prop                    | Type                                       | Description                                                       |
| ----------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| `columns`               | `ColumnDef<T>[]`                           | Table column definitions (required)                               |
| `payload`               | `{ data: T[]; total: number }`             | Table data and total row count                                    |
| `state`                 | `Partial<TableState>`                      | State obtained from `useGridState`                                |
| `onColumnFiltersChange` | `OnChangeFn<ColumnFiltersState>`           | Handler for column filter changes                                 |
| `onPaginationChange`    | `OnChangeFn<PaginationState>`              | Handler for pagination changes                                    |
| `onSortingChange`       | `OnChangeFn<SortingState>`                 | Handler for sorting changes                                       |
| `onRowSelectionChange`  | `OnChangeFn<RowSelectionState>`            | Handler for row selection changes                                 |
| `setGlobalFilter`       | `Dispatch<SetStateAction<string>>`         | Function to set the global search/filter                          |
| `manualPagination`      | `boolean`                                  | Set to `true` to enable server-side pagination                    |
| `enableRowSelection`    | `boolean`                                  | Enables/disables row selection (default `true`)                   |
| `isLoading`             | `boolean`                                  | Shows the loading state                                           |
| `isError`               | `boolean`                                  | Shows the error state                                             |
| `isFetching`            | `boolean`                                  | For a refetching indicator                                        |
| `refetch`               | `() => void`                               | Function to reload the data                                       |
| `renderSubComponent`    | `(props: { row: Row<T> }) => ReactElement` | Custom content for expandable rows                                |
| `getRowCanExpand`       | `(row: Row<T>) => boolean`                 | Determines which rows can be expanded                             |
| `height`                | `string`                                   | Table height (default `'65vh'`)                                   |
| `isToolbar`             | `boolean`                                  | Whether to show the toolbar (default `true`)                      |
| `isPagination`          | `boolean`                                  | Whether to show the pagination component (default `true`)         |
| `name`                  | `string`                                   | Unique grid name, used to persist local state (default `'munza'`) |
| `children`              | `ReactNode`                                | Renders extra content inside the grid                             |

## 5. Special Column Definition Features

### Filter variant

Set `meta.filterVariant` on each column to determine the filter type. The following variants are supported:

- `'text'`
- `'number'`
- `'tel'`
- `'url'`
- `'color'`
- `'range'`
- `'select'`
- `'dateRange'`
- `'date'`
- `'datetime-local'`
- `'month'`
- `'time'`
- `'week'`

```tsx
meta: {
  filterVariant: 'text', // 'number' | 'tel' | 'url' | 'color' | 'range' | 'select' | 'dateRange' | 'date' | 'datetime-local' | 'month' | 'time' | 'week'
},
```

Example — a numeric range filter:

```tsx
{
  id: 'price',
  accessorKey: 'price',
  header: () => <div>Price</div>,
  cell: (info) => info.getValue(),
  meta: { filterVariant: 'range' },
},
```

Example — a date filter:

```tsx
{
  id: 'createdAt',
  accessorKey: 'createdAt',
  header: () => <div>Created At</div>,
  cell: (info) => info.getValue(),
  meta: { filterVariant: 'date' },
},
```

To disable filtering on a specific column:

```tsx
enableColumnFilter: false,
```

### Row pinning

Use `row.pin()` and `row.getIsPinned()` to pin/unpin rows:

```tsx
cell: ({ row }) =>
  row.getIsPinned() ? (
    <button onClick={() => row.pin(false)}>❌</button>
  ) : (
    <>
      <button onClick={() => row.pin('top')}>⬆️</button>
      <button onClick={() => row.pin('bottom')}>⬇️</button>
    </>
  ),
```

### Row number column

```tsx
{
  accessorFn: (_row, index) => index + 1,
  id: 'rowNumber',
  header: '#',
  cell: ({ row, table }) => {
    const { pageIndex, pageSize } = table.getState().pagination;
    return pageIndex * pageSize + row.index + 1;
  },
},
```

### Column size limits

```tsx
size: 52,
maxSize: 52,
```

### Non-hideable column

```tsx
enableHiding: false,
```

## 6. Building Server-Side Queries

Use the `useQueryArgs` hook to build query parameters from the table state that can be sent to an API:

```tsx
import { useQueryArgs } from 'munza-x-data-grid';

const { pagination, queryParams, sort, globalFilter } = useQueryArgs(state);
```

(`useQueryArgs` is exported from the same main entry point, no separate sub-path needed.)

It returns:

- `pagination` — current page/page size
- `queryParams` — query parameters built from column filters
- `sort` — sort string
- `globalFilter` — global search text

## 7. Syncing State to the URL

```tsx
import { URLSearch } from 'munza-x-data-grid';

console.log(URLSearch(state));
```

This generates URL search parameters from the current table state, which can be used to sync with your router.

## 8. Example: Full Flow

```tsx
const { state, handlers } = useGridState();
const queryArgs = useQueryArgs(state);

// Call your API with queryArgs, then pass the result as payload
<Grid
  payload={{ data: apiResponse.data, total: apiResponse.total }}
  columns={columns}
  manualPagination
  isLoading={isFetching}
  isError={isError}
  refetch={refetch}
  state={state}
  {...handlers}
/>;
```
