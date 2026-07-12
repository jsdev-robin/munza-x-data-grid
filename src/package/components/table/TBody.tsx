import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import React from 'react';
import TableError from '../feedback/TableError';
import TableNoData from '../feedback/TableNoData';
import TableSkeleton from '../feedback/TableSkeleton';
import TCell from './TCell';
import { TableCellPin } from './TableCellPin';

const TBody = () => {
  'use no memo';

  const { table, isLoading, isError, renderSubComponent, isSplit } = useGrid();

  return isLoading ? (
    <TableSkeleton />
  ) : isError ? (
    <TableError />
  ) : table.getRowModel().rows.length === 0 ? (
    <TableNoData />
  ) : (
    <Table
      style={{
        width: table.getCenterTotalSize(),
      }}
    >
      <TableBody>
        {table.getTopRows().map((row) => (
          <TableCellPin
            key={row.id}
            row={row}
            table={table}
            isSplit={isSplit}
          />
        ))}
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <TableRow
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
            {renderSubComponent && row.getIsExpanded() && (
              <TableRow>
                <TableCell colSpan={row.getVisibleCells().length}>
                  {renderSubComponent({ row })}
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
        {table.getBottomRows().map((row) => (
          <TableCellPin
            key={row.id}
            row={row}
            table={table}
            isSplit={isSplit}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default TBody;
