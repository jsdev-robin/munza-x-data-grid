import { TableCell } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import { getPinStyles } from '@/package/utils/getPinStyles';
import { flexRender, type Cell } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

interface TCellProps<T> {
  cell: Cell<T, unknown>;
}
const TCell = <T,>({ cell }: TCellProps<T>) => {
  const { density, isSplit } = useGrid();

  const style: CSSProperties = {
    width: cell.column.getSize(),
    minWidth: cell.column.getSize(),
    maxWidth: cell.column.getSize(),
    padding: density === 'sm' ? '4px' : density === 'md' ? '8px' : '16px',
    transition: 'padding 0.2s',
    ...getPinStyles(cell.column, isSplit),
  };

  return (
    <TableCell key={cell.id} style={style} className="mun:truncate">
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default TCell;
