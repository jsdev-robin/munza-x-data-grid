import React from 'react';
import { useStores, type TStore } from './hooks/useStores';
import { Grid, useGridState, type ColumnDef } from './index';

const App = () => {
  const { data, isLoading, isError, isFetching } = useStores();

  const columns = React.useMemo<ColumnDef<TStore, unknown>[]>(
    () => [
      {
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'text',
        },
      },
      {
        accessorKey: 'address',
        id: 'address',
        cell: (info) => {
          const addr = info.getValue() as TStore['address'];
          return (
            <address className="whitespace-normal">
              {addr.country}, {addr.state}, {addr.city}, {addr.zone},{' '}
              {addr.landmark}
            </address>
          );
        },
        header: () => <span>Address</span>,
        size: 350,
        maxSize: 350,
      },
    ],
    [],
  );

  const { state, handlers } = useGridState();

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
