'use client';

import { useGrid } from '../../hooks/useGrid';
import TableError from '../feedback/TableError';
import TableNoData from '../feedback/TableNoData';
import TableSkeleton from '../feedback/TableSkeleton';
import { Table, TableBody, TableRow } from '../ui/table';
import TCell from './TCell';

const TBody = () => {
  const { table, isLoading, isError } = useGrid();

  return isLoading ? (
    <TableSkeleton />
  ) : isError ? (
    <TableError />
  ) : table.getRowModel().rows.length === 0 ? (
    <TableNoData />
  ) : (
    <Table>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} className="mun:*:border-r mun:*:border-border">
            {row.getVisibleCells().map((cell) => (
              <TCell key={cell.id} cell={cell} />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TBody;
