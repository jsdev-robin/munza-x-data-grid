'use client';

import { Table, TableHeader, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import THead from './THead';

const THeader = () => {
  const { table, isSplit } = useGrid();

  return (
    <Table
      style={{
        width: table.getCenterTotalSize(),
      }}
    >
      <TableHeader className="sticky top-0 z-10 bg-muted">
        {(isSplit
          ? table.getCenterHeaderGroups()
          : table.getHeaderGroups()
        ).map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="mun:*:border-r mun:*:border-border"
          >
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
