import { useMemo } from 'react';
import { useGrid } from '../../hooks/useGrid';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import NoDataFoundMsg from './NoDataFoundMsg';

const TableNoData = () => {
  const { table } = useGrid();
  const visibleColumns = useMemo(() => table.getAllLeafColumns(), [table]);

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
