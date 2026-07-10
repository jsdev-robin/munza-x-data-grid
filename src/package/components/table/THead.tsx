import { TableHead } from '@/components/ui/table';
import { type Header } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
import HeaderFilter from '../header/HeaderFilter';
import HeaderSort from '../header/HeaderSort';

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
  };

  return (
    <TableHead
      key={header.id}
      colSpan={header.colSpan}
      style={style}
      className="mun:p-0 mun:truncate mun:relative mun:group"
    >
      {header.isPlaceholder ? null : (
        <div className="mun:flex mun:flex-col">
          <div className="mun:p-1.5 mun:flex mun:items-center mun:justify-between mun:gap-3">
            <HeaderSort header={header} />
          </div>
          <HeaderFilter column={header.column} />
        </div>
      )}
    </TableHead>
  );
};

export default THead;
