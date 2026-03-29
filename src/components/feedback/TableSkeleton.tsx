import { useGrid } from '../../hooks/useGrid';
import { getPinStyles } from '../../utils/getPinStyles';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import TableRowSkeleton from './TableRowSkeleton';

const TableSkeleton = () => {
  const { table } = useGrid();

  const visibleColumns = table
    .getHeaderGroups()
    .map((group) =>
      group.headers
        .filter((header) => !header.isPlaceholder && !header.subHeaders?.length)
        .map((header) => header.column),
    )
    .flat();

  return (
    <Table>
      <TableBody>
        {[...Array(20)].map((_, i) => (
          <TableRow key={i} className="mun:*:border-r mun:*:border-border">
            {visibleColumns.map((column, j) => (
              <TableCell
                key={j}
                style={{
                  width: column.getSize(),
                  minWidth: column.getSize(),
                  maxWidth: column.getSize(),
                  ...getPinStyles(column),
                }}
              >
                <TableRowSkeleton column={column} i={i} j={j} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
