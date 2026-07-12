import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import React from 'react';
import TableRightSkeleton from '../feedback/TableRightSkeleton';
import TCell from './TCell';

const TGetRightBody = () => {
  const { table, isLoading, isError, renderSubComponent } = useGrid();

  return isLoading ? (
    <TableRightSkeleton />
  ) : isError ? (
    <div>Error</div>
  ) : table.getRowModel().rows.length === 0 ? (
    <div>No</div>
  ) : (
    <Table>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <TableRow
              data-state={row.getIsSelected() && 'selected'}
              className="mun:*:border-r mun:*:border-border"
            >
              {row.getRightVisibleCells().map((cell) => (
                <TCell key={cell.id} cell={cell} />
              ))}
            </TableRow>
            {renderSubComponent && row.getIsExpanded() && (
              <TableRow>
                <TableCell colSpan={row.getVisibleCells().length}>
                  {renderSubComponent({ row })}
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default TGetRightBody;
