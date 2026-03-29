'use client';

import { useGrid } from '../../hooks/useGrid';
import { Table, TableBody, TableRow } from '../ui/table';
import TCell from './TCell';

const TBody = () => {
  const { table, isLoading, isError } = useGrid();

  return isLoading ? (
    <div>Loading</div>
  ) : isError ? (
    <div>Error</div>
  ) : table.getRowModel().rows.length === 0 ? (
    <div>No Data found</div>
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
