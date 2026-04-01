# munza-x-data-grid

A flexible, feature-rich React data grid component built on top of [@tanstack/react-table](https://tanstack.com/table), with Tailwind CSS v4 styling and shadcn/ui primitives.

---

## Installation

```bash
npm install munza-x-data-grid
```

Import the stylesheet in your app entry point:

```js
import 'munza-x-data-grid/style.css';
```

### Peer Dependencies

```bash
npm install react react-dom
```

Requires **React 18 or 19**.

---

## Basic Usage

```tsx
import { Grid, useGridState, type ColumnDef } from 'munza-x-data-grid';
import 'munza-x-data-grid/style.css';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
};

const columns: ColumnDef<Person>[] = [
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'age', header: 'Age' },
];

const data: Person[] = [{ firstName: 'Alice', lastName: 'Smith', age: 30 }];

export default function App() {
  const { state, handlers } = useGridState();

  return (
    <Grid
      columns={columns}
      payload={{ data, total: data.length }}
      state={state}
      {...handlers}
    />
  );
}
```

---

## API Reference

### `<Grid />`

The top-level component that renders the full data grid.

| Prop                    | Type                                       | Required | Description                                              |
| ----------------------- | ------------------------------------------ | -------- | -------------------------------------------------------- |
| `columns`               | `ColumnDef<T>[]`                           | ✅       | Column definitions (TanStack Table format)               |
| `payload`               | `{ data: T[], total: number }`             | ✅       | Row data and total count for pagination                  |
| `state`                 | `Partial<TableState>`                      | ✅       | Controlled table state (from `useGridState`)             |
| `onColumnFiltersChange` | `OnChangeFn<ColumnFiltersState>`           | —        | Callback for column filter changes                       |
| `onPaginationChange`    | `OnChangeFn<PaginationState>`              | —        | Callback for pagination changes                          |
| `onSortingChange`       | `OnChangeFn<SortingState>`                 | —        | Callback for sort changes                                |
| `setGlobalFilter`       | `Dispatch<SetStateAction<string>>`         | —        | Callback to update the global search filter              |
| `isLoading`             | `boolean`                                  | —        | Displays a loading state                                 |
| `isError`               | `boolean`                                  | —        | Displays an error state                                  |
| `manualPagination`      | `boolean`                                  | —        | Set `true` for server-side pagination (default: `false`) |
| `getRowCanExpand`       | `(row: Row<T>) => boolean`                 | —        | Controls which rows are expandable                       |
| `renderSubComponent`    | `(props: { row: Row<T> }) => ReactElement` | —        | Renders expanded row content                             |

---

### `useGridState()`

Hook that provides controlled state and event handlers to pass into `<Grid />`.

```tsx
const { state, handlers } = useGridState();
```

**Returns:**

| Key        | Description                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| `state`    | Partial `TableState` object (sorting, pagination, filters, etc.)                                      |
| `handlers` | Object containing `onSortingChange`, `onPaginationChange`, `onColumnFiltersChange`, `setGlobalFilter` |

Spread `handlers` directly onto `<Grid />`:

```tsx
<Grid state={state} {...handlers} columns={columns} payload={payload} />
```

### Tailwind v4 Setup

If you're using Tailwind v4, add this to your `app.css` so Tailwind scans the grid's classes:

```css
@source "../node_modules/munza-x-data-grid/**/*.{js,ts,jsx,tsx}";
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-border: var(--border);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --border: oklch(0.922 0 0);
  --muted: oklch(0.97 0 0);
  --accent: oklch(0.97 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --muted: oklch(0.269 0 0);
  --accent: oklch(0.269 0 0);
}
```

---

## Column Definitions

Columns follow the standard [TanStack Table `ColumnDef`](https://tanstack.com/table/latest/docs/api/core/column-def) format with an additional `meta` field for filter configuration.

### Filter Variants

Set `meta.filterVariant` on a column to control its filter UI:

```tsx
{
  accessorKey: 'status',
  header: 'Status',
  meta: {
    filterVariant: 'select', // dropdown filter
  },
}

{
  accessorKey: 'age',
  header: 'Age',
  meta: {
    filterVariant: 'text', // text input filter
  },
}
```

### Row Number Column

```tsx
{
  accessorFn: (_row, index) => index + 1,
  cell: ({ row }) => row.index + 1,
  id: 'rowNumber',
  header: '',
  size: 54,
  maxSize: 54,
  enableColumnFilter: false,
}
```

### Checkbox Selection Column

```tsx
{
  id: 'select',
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  size: 40,
  maxSize: 40,
  enableColumnFilter: false,
}
```

---

## Server-Side Pagination

Set `manualPagination` to `true` and pass `payload.total` as the full server-side count.

```tsx
<Grid
  columns={columns}
  payload={{ data: serverData, total: serverTotal }}
  state={state}
  {...handlers}
  manualPagination={true}
/>
```

The built-in pagination UI supports the following page sizes:

```
20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000
```

---

## Expandable Rows

```tsx
<Grid
  columns={columns}
  payload={payload}
  state={state}
  {...handlers}
  getRowCanExpand={(row) => !!row.original.subRows?.length}
  renderSubComponent={({ row }) => (
    <div className="p-4">
      <pre>{JSON.stringify(row.original, null, 2)}</pre>
    </div>
  )}
/>
```

---

## Column Pinning

Column pinning is managed internally by the grid. No additional configuration is required — use the built-in toolbar UI to pin columns left or right.

---

## Default Column Sizing

| Property  | Default |
| --------- | ------- |
| `size`    | `180px` |
| `minSize` | `180px` |
| `maxSize` | `180px` |

Override per-column:

```tsx
{
  accessorKey: 'id',
  size: 60,
  minSize: 60,
  maxSize: 60,
}
```

---

## TypeScript

All props and hooks are fully typed. Import types directly from the package:

```ts
import type { ColumnDef } from 'munza-x-data-grid';
```

TanStack Table types (`Row`, `TableState`, `PaginationState`, etc.) are re-exported and available from `@tanstack/react-table`.
