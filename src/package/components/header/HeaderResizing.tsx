'use client';

import { cn } from '@/lib/utils';
import { type Header } from '@tanstack/react-table';

const HeaderResizing = <T,>({ header }: { header: Header<T, unknown> }) => {
  return (
    <div
      onDoubleClick={() => header.column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className={cn(
        'mun:absolute mun:top-0 mun:right-0 mun:h-full mun:w-1.25 mun:bg-black/50 mun:cursor-col-resize mun:select-none mun:touch-none mun:opacity-0 mun:group-hover:opacity-100',
        header.column.getIsResizing() ? 'mun:bg-blue-500 mun:opacity-100' : '',
      )}
    />
  );
};

export default HeaderResizing;
