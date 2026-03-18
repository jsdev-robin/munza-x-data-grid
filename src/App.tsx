import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
} from '@tanstack/react-table';
import React from 'react';
import { Grid } from './core/Grid';
import { dummyPeople, type Person } from './data/dummyData';

const App = () => {
  const columns = React.useMemo<ColumnDef<Person, unknown>[]>(
    () => [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
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
            }}
            onColumnFiltersChange={setColumnFilters}
            onPaginationChange={setPagination}
          />
        </div>
      </div>
    </section>
  );
};

export default App;
