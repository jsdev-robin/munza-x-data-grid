import type { Column } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

export const getPinStyles = <T>(
  column: Column<T>,
  isSplit: boolean,
): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    borderRight: isLastLeftPinnedColumn ? '1px solid var(--border)' : undefined,
    borderLeft: isFirstRightPinnedColumn
      ? '1px solid var(--border)'
      : undefined,
    left:
      isPinned === 'left' && !isSplit
        ? `${column.getStart('left')}px`
        : undefined,
    right:
      isPinned === 'right' && !isSplit
        ? `${column.getAfter('right')}px`
        : undefined,
    position: isPinned ? (isSplit ? 'relative' : 'sticky') : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
    background: isPinned ? `var(--muted)` : undefined,
  };
};
