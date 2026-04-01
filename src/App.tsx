import React from 'react';
import { Checkbox } from './components/ui/checkbox';
import { useStores, type TStore } from './hooks/useStores';
import { Grid, useGridState, type ColumnDef } from './index';

const App = () => {
  const { data, isLoading, isError, isFetching } = useStores();

  console.log(data);

  const columns = React.useMemo<ColumnDef<TStore, unknown>[]>(
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
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
      },
      {
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        size: 800,
        maxSize: 800,
        meta: {
          filterVariant: 'select',
        },
      },
      {
        accessorKey: 'contactName',
        cell: (info) => info.getValue(),
        size: 800,
        maxSize: 800,
        meta: {
          filterVariant: 'select',
        },
      },
    ],
    [],
  );

  const { state, handlers } = useGridState();

  console.log(state);

  return (
    <section className="mun:py-10">
      <div className="mun:container mun:px-10 mun:inset-x-auto">
        <div className="mun:bg-card mun:rounded-md mun:p-4">
          <Grid
            columns={columns}
            payload={data?.payload}
            state={state}
            {...handlers}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
          />
        </div>
      </div>
    </section>
  );
};

export default App;
