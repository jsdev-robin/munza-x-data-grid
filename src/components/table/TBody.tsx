'use client';

import { useGrid } from '../../hooks/useGrid';
import { Table, TableBody, TableRow } from '../ui/table';
import TCell from './TCell';

const TBody = () => {
  const { table } = useGrid();

  return (
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
