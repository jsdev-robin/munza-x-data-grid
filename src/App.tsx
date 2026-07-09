import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { dummyVehicles, type Vehicle } from './data/dummyVehicles';
import { Grid } from './package';

const App = () => {
  'use no memo';
  const columns = useMemo<ColumnDef<Vehicle, unknown>[]>(
    () => [
      {
        id: 'driver',
        accessorKey: 'driver',
        cell: (info) => info.getValue(),
        header: () => <div>Driver</div>,
        enableColumnFilter: true,
      },
      {
        id: 'vehicle',
        accessorKey: 'vehicle',
        cell: (info) => info.getValue(),
        header: () => <div>Vehicle</div>,
      },
      {
        id: 'vin',
        accessorKey: 'vin',
        cell: (info) => info.getValue(),
        header: () => <div>VIN</div>,
      },
      {
        id: 'type',
        accessorKey: 'type',
        cell: (info) => info.getValue(),
        header: () => <div>Type</div>,
      },
      {
        id: 'status',
        accessorKey: 'status',
        cell: (info) => info.getValue(),
        header: () => <div>Status</div>,
      },
      {
        id: 'currentMeter',
        accessorKey: 'currentMeter',
        cell: (info) => info.getValue(),
        header: () => <div>Current Meter</div>,
      },
      {
        id: 'fuel',
        accessorKey: 'fuel',
        cell: (info) => info.getValue(),
        header: () => <div>Fuel</div>,
      },
      {
        id: 'drivingTime',
        accessorKey: 'drivingTime',
        cell: (info) => info.getValue(),
        header: () => <div>Driving Time</div>,
      },
      {
        id: 'license',
        accessorKey: 'license',
        cell: (info) => info.getValue(),
        header: () => <div>License</div>,
      },
      {
        id: 'odometer',
        accessorKey: 'odometer',
        cell: (info) => info.getValue(),
        header: () => <div>Odometer</div>,
      },
    ],
    [],
  );

  return (
    <section>
      <div className="container py-10">
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
