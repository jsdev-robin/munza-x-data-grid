import { flexRender, type Header } from '@tanstack/react-table';

const HeaderSort = <T,>({ header }: { header: Header<T, unknown> }) => {
  return (
    <div className="mun:space-y-1.5 mun:w-full">
      <span>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </span>
    </div>
  );
};

export default HeaderSort;
