'use client';

import { useGrid } from '../../hooks/useGrid';
import { Table, TableHeader, TableRow } from '../ui/table';
import THead from './THead';

const THeader = () => {
  const { table } = useGrid();

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="*:border-r *:border-border">
            {headerGroup.headers.map((header) => (
              <THead header={header} key={header.id} />
            ))}
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  );
};

export default THeader;
