'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import { getPinStyles } from '../../utils/getPinStyles';
import TableRowSkeleton from './TableRowSkeleton';

const TableLeftSkeleton = () => {
  const { table, isSplit, density } = useGrid();

  const visibleColumns = table
    .getLeftHeaderGroups()
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
                  padding:
                    density === 'sm'
                      ? '4px'
                      : density === 'md'
                        ? '8px'
                        : '16px',
                  transition: 'padding 0.2s',
                  ...getPinStyles(column, isSplit),
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

export default TableLeftSkeleton;
