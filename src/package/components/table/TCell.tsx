'use client';

import { TableCell } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import { getPinStyles } from '@/package/utils/getPinStyles';
import { flexRender, type Cell } from '@tanstack/react-table';
import { useLayoutEffect, useRef, type CSSProperties } from 'react';

interface TCellProps<T> {
  cell: Cell<T, unknown>;
}
const TCell = <T,>({ cell }: TCellProps<T>) => {
  const { density, isSplit } = useGrid();
  const cellRef = useRef<HTMLTableCellElement>(null);

  useLayoutEffect(() => {
    const node = cellRef.current;
    if (!node) return;

    const setCellHeightVar = () => {
      const { height } = node.getBoundingClientRect();
      document.documentElement.style.setProperty('--cell-h', `${height}px`);
    };

    setCellHeightVar();

    const resizeObserver = new ResizeObserver(setCellHeightVar);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [density, isSplit]);

  const style: CSSProperties = {
    width: cell.column.getSize(),
    minWidth: cell.column.getSize(),
    maxWidth: cell.column.getSize(),
    padding: density === 'sm' ? '4px' : density === 'md' ? '8px' : '16px',
    height: isSplit ? 'calc(var(--cell-h))' : undefined,
    transition: 'padding 0.2s',
    ...getPinStyles(cell.column, isSplit),
  };

  return (
    <TableCell
      ref={cellRef}
      key={cell.id}
      style={style}
      className="mun:truncate"
      title={cell.getValue() != null ? String(cell.getValue()) : undefined}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default TCell;
