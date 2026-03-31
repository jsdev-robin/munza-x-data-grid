'use client';

import { type Header } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
import { getPinStyles } from '../../utils/getPinStyles';
import HeaderFilter from '../header/HeaderFilter';
import HeaderMenu from '../header/HeaderMenu';
import HeaderSort from '../header/HeaderSort';
import { TableHead } from '../ui/table';

interface THeadProps<T> {
  header: Header<T, unknown>;
}

const THead = <T,>({ header }: THeadProps<T>) => {
  const style: CSSProperties = {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: header.getSize(),
    minWidth: header.getSize(),
    maxWidth: header.getSize(),
    ...getPinStyles(header.column),
  };

  return (
    <TableHead
      key={header.id}
      colSpan={header.colSpan}
      style={style}
      className="mun:p-0 mun:truncate mun:relative mun:group"
    >
      <>
        {header.isPlaceholder ? null : (
          <div className="mun:flex mun:flex-col mun:gap-1.5">
            <div className="mun:p-1.5 mun:flex mun:items-center mun:justify-between mun:gap-3">
              <HeaderSort header={header} />
              <HeaderMenu header={header} />
            </div>
            <HeaderFilter column={header.column} />
          </div>
        )}
      </>
    </TableHead>
  );
};

export default THead;
