'use client';

import React from 'react';
import { useGrid } from '../../hooks/useGrid';
import TableError from '../feedback/TableError';
import TableNoData from '../feedback/TableNoData';
import TableSkeleton from '../feedback/TableSkeleton';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import TCell from './TCell';

const TBody = () => {
  const { table, isLoading, isError, renderSubComponent } = useGrid();

  return isLoading ? (
    <TableSkeleton />
  ) : isError ? (
    <TableError />
  ) : table.getRowModel().rows.length === 0 ? (
    <TableNoData />
  ) : (
    <Table>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <TableRow className="mun:*:border-r mun:*:border-border">
              {row.getVisibleCells().map((cell) => (
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

export default TBody;
