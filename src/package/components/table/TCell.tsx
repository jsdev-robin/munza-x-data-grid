import { TableCell } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import { flexRender, type Cell } from '@tanstack/react-table';

interface TCellProps<T> {
  cell: Cell<T, unknown>;
}
const TCell = <T,>({ cell }: TCellProps<T>) => {
  const { density } = useGrid();

  return (
    <TableCell
      key={cell.id}
      style={{
        width: cell.column.getSize(),
        minWidth: cell.column.getSize(),
        maxWidth: cell.column.getSize(),
        padding: density === 'sm' ? '4px' : density === 'md' ? '8px' : '16px',
        transition: 'padding 0.2s',
      }}
      className="mun:truncate"
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default TCell;
