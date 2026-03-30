import { flexRender, type Header } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const HeaderSort = <T,>({ header }: { header: Header<T, unknown> }) => {
  return (
    <div
      {...{
        className: header.column.getCanSort()
          ? 'cursor-pointer select-none flex items-center gap-2'
          : '',
        onClick: header.column.getToggleSortingHandler(),
      }}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {{
        asc: <ChevronUpIcon className="size-4" />,
        desc: <ChevronDownIcon className="size-4" />,
      }[header.column.getIsSorted() as string] ?? null}
    </div>
  );
};

export default HeaderSort;
