import { TableRow } from '@/components/ui/table';
import { type Row, type Table } from '@tanstack/react-table';
import TCell from './TCell';

export function TableCellPin({
  row,
  table,
  isSplit,
}: {
  row: Row<any>;
  table: Table<any>;
  isSplit: boolean;
}) {
  return (
    <TableRow
      style={{
        backgroundColor: 'blue',
        position: 'sticky',
        zIndex: 10,
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
      {(isSplit ? row.getCenterVisibleCells() : row.getVisibleCells()).map(
        (cell) => (
          <TCell key={cell.id} cell={cell} />
        ),
      )}
    </TableRow>
  );
}
