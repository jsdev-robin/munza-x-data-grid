import { Table, TableBody, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import TCell from './TCell';

const TGetLeftBody = () => {
  const { table } = useGrid();
  return (
    <Table>
      <TableBody>
        {table.getRowModel().rows.map((row) => {
          return (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className="mun:*:border-r mun:*:border-border"
            >
              {row.getLeftVisibleCells().map((cell) => (
                <TCell key={cell.id} cell={cell} />
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TGetLeftBody;
