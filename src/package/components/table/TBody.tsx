import { Table, TableBody, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import TCell from './TCell';

const TBody = () => {
  const { table, isSplit } = useGrid();

  return (
    <Table>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className="mun:*:border-r mun:*:border-border"
          >
            {(isSplit
              ? row.getCenterVisibleCells()
              : row.getVisibleCells()
            ).map((cell) => (
              <TCell key={cell.id} cell={cell} />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TBody;
