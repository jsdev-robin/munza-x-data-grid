import { flexRender, type Header } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const HeaderSort = <T,>({ header }: { header: Header<T, unknown> }) => {
  return (
    <div
      {...{
        className: header.column.getCanSort()
          ? 'mun:cursor-pointer mun:select-none mun:flex mun:items-center mun:gap-2'
          : '',
        onClick: header.column.getToggleSortingHandler(),
      }}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {{
        asc: <ChevronUpIcon className="mun:size-4" />,
        desc: <ChevronDownIcon className="mun:size-4" />,
      }[header.column.getIsSorted() as string] ?? null}
    </div>
  );
};

export default HeaderSort;
