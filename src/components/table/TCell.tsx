import { flexRender, type Cell } from '@tanstack/react-table';
import { TableCell } from '../ui/table';

interface TCellProps<T> {
  cell: Cell<T, unknown>;
}
const TCell = <T,>({ cell }: TCellProps<T>) => {
  return (
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
  );
};

export default TCell;
