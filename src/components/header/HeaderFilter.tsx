import type { Column } from '@tanstack/react-table';
import { Input } from '../ui/input';

const HeaderFilter = <T,>({ column }: { column: Column<T, unknown> }) => {
  return (
    <div className="mun:p-1.5 mun:border-t mun:border-border mun:w-full">
      {column.getCanFilter() ? (
        <div>
          <Input />
        </div>
      ) : null}
    </div>
  );
};

export default HeaderFilter;
