import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { dummyVehicles, type Vehicle } from './data/dummyData';
import { Grid } from './package';

const App = () => {
  const columns = useMemo<ColumnDef<Vehicle, unknown>[]>(
    () => [
      {
        id: 'driver',
        accessorKey: 'driver',
        cell: (info) => info.getValue(),
        header: () => <div>Driver</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'vehicle',
        accessorKey: 'vehicle',
        cell: (info) => info.getValue(),
        header: () => <div>Vehicle</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'vin',
        accessorKey: 'vin',
        cell: (info) => info.getValue(),
        header: () => <div>VIN</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'type',
        accessorKey: 'type',
        cell: (info) => info.getValue(),
        header: () => <div>Type</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'status',
        accessorKey: 'status',
        cell: (info) => info.getValue(),
        header: () => <div>Status</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'currentMeter',
        accessorKey: 'currentMeter',
        cell: (info) => info.getValue(),
        header: () => <div>Current Meter</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'fuel',
        accessorKey: 'fuel',
        cell: (info) => info.getValue(),
        header: () => <div>Fuel</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'drivingTime',
        accessorKey: 'drivingTime',
        cell: (info) => info.getValue(),
        header: () => <div>Driving Time</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'license',
        accessorKey: 'license',
        cell: (info) => info.getValue(),
        header: () => <div>License</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'odometer',
        accessorKey: 'odometer',
        cell: (info) => info.getValue(),
        header: () => <div>Odometer</div>,
        meta: {
          filterVariant: 'text',
        },
      },
    ],
    [],
  );

  return (
    <section>
      <div className="mun:container mun:p-10">
        <Grid
          payload={{
            data: dummyVehicles,
            total: 20,
          }}
          columns={columns}
        />
      </div>
    </section>
  );
};

export default App;
