import { type Header } from '@tanstack/react-table';
import HeaderFilter from '../header/HeaderFilter';
import HeaderSort from '../header/HeaderSort';
import { TableHead } from '../ui/table';

interface THeadProps<T> {
  header: Header<T, unknown>;
}

const THead = <T,>({ header }: THeadProps<T>) => {
  return (
    <TableHead
      key={header.id}
      colSpan={header.colSpan}
      style={{
        minWidth: header.getSize(),
      }}
      className="mun:p-0 mun:truncate mun:relative mun:group"
    >
      <>
        {header.isPlaceholder ? null : (
          <div className="mun:flex mun:flex-col mun:gap-1.5">
            <div className="mun:p-1.5 mun:flex mun:items-center mun:justify-between mun:gap-3">
              <HeaderSort header={header} />
            </div>
            <HeaderFilter column={header.column} />
          </div>
        )}
      </>
    </TableHead>
  );
};

export default THead;
