import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import React from 'react';
import { Grid } from './core/Grid';
import { dummyPeople, type Person } from './data/dummyData';

const App = () => {
  const columns = React.useMemo<ColumnDef<Person, unknown>[]>(
    () => [
      {
        accessorFn: (_row, index) => index + 1,
        cell: ({ row }) => row.index + 1,
        id: 'rowNumber',
        header: '',
        size: 54,
        maxSize: 54,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'select',
        },
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        meta: {
          filterVariant: 'text',
        },
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
      },
    ],
    [],
  );

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);

  console.log(sorting);
  console.log(columnFilters);
  console.log(pagination);

  return (
    <section className="mun:py-10">
      <div className="mun:container mun:px-10 mun:inset-x-auto">
        <div className="mun:bg-card mun:rounded-md mun:p-4">
          <Grid
            columns={columns}
            payload={{
              data: dummyPeople,
              total: 100,
            }}
            state={{
              columnFilters,
              pagination,
              sorting,
            }}
            onColumnFiltersChange={setColumnFilters}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
          />
        </div>
      </div>
    </section>
  );
};

export default App;
