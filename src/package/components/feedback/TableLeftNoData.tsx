'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import NoDataFoundMsg from './NoDataFoundMsg';

const TableLeftNoData = () => {
  'use no memo';

  const { table } = useGrid();

  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            {table.getLeftVisibleLeafColumns().map((column, i) => (
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

export default TableLeftNoData;
