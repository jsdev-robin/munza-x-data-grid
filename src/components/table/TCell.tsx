'use client';

import { flexRender, type Cell } from '@tanstack/react-table';
import { type CSSProperties } from 'react';
import { getPinStyles } from '../../utils/getPinStyles';
import { TableCell } from '../ui/table';

interface TCellProps<T> {
  cell: Cell<T, unknown>;
}
const TCell = <T,>({ cell }: TCellProps<T>) => {
  const style: CSSProperties = {
    position: 'relative',
    width: cell.column.getSize(),
    minWidth: cell.column.getSize(),
    maxWidth: cell.column.getSize(),
    ...getPinStyles(cell.column),
  };

  return (
    <TableCell key={cell.id} style={style}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default TCell;
