import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { useGrid } from '../contexts/GridContext';

const TBody = () => {
  const { table } = useGrid();

  return (
    <Table>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                  minWidth: cell.column.getSize(),
                  maxWidth: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TBody;
