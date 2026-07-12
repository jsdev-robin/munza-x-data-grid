import { TableRow } from '@/components/ui/table';
import { type Row, type Table } from '@tanstack/react-table';
import TCell from './TCell';

export function TableCellPin({
  row,
  table,
}: {
  row: Row<any>;
  table: Table<any>;
}) {
  return (
    <TableRow
      style={{
        backgroundColor: 'var(--muted)',
        position: 'sticky',
        zIndex: 1,
        top:
          row.getIsPinned() === 'top'
            ? `calc(${row.getPinnedIndex()} * var(--cell-h))`
            : undefined,
        bottom:
          row.getIsPinned() === 'bottom'
            ? `calc(${
                table.getBottomRows().length - 1 - row.getPinnedIndex()
              } * var(--cell-h))`
            : undefined,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TCell key={cell.id} cell={cell} />
      ))}
    </TableRow>
  );
}
