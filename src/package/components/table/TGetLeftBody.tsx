import { Table, TableBody, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import TCell from './TCell';

const TGetLeftBody = () => {
  const { table } = useGrid();
  return (
    <div
      className="mun:w-full mun:overflow-scroll mun:bg-background"
      style={{ height: '65vh' }}
    >
      <Table>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getLeftVisibleCells().map((cell) => (
                  <TCell key={cell.id} cell={cell} />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TGetLeftBody;
