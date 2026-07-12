'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import { useMemo } from 'react';
import NoDataFoundMsg from './NoDataFoundMsg';

const TableNoData = () => {
  'use no memo';

  const { table, isSplit } = useGrid();

  const visibleColumns = useMemo(
    () =>
      isSplit
        ? table.getCenterVisibleLeafColumns()
        : table.getVisibleLeafColumns(),
    [table, isSplit],
  );

  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            {visibleColumns.map((column, i) => (
              <TableCell
                key={i}
                style={{
                  width: column.getSize(),
                  minWidth: column.getSize(),
                  maxWidth: column.getSize(),
                }}
              />
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <NoDataFoundMsg />
    </>
  );
};

export default TableNoData;
