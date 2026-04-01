'use client';

import type { Column } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import DebouncedInput from '../ui/debounced-input';

const ToolbarFilter = <T,>({ column }: { column: Column<T, unknown> }) => {
  const sortedUniqueValues = useMemo(() => {
    return column.getCanFilter()
      ? {
          id: column.id
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, (char) => char.toUpperCase()),
          uniqueValues: Array.from(column.getFacetedUniqueValues().keys()),
        }
      : null;
  }, [column]);

  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const [open, setOpen] = useState(false);

  return (
    <>
      {column.getCanFilter() ? (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="mun:flex mun:whitespace-nowrap mun:items-center mun:gap-2">
            <span className="mun:size-7 mun:inline-flex mun:items-center mun:justify-center mun:rounded-md mun:transition-all mun:hover:bg-card">
              {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
            <span>{sortedUniqueValues?.id}</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mun:p-3 mun:pr-0">
              <datalist id={column.id + 'list'}>
                {sortedUniqueValues?.uniqueValues.map(
                  (value: string, i: number) => (
                    <option value={value} key={i} />
                  ),
                )}
              </datalist>
              <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={(value) => column.setFilterValue(value)}
                placeholder={`Search... (${
                  column.getFacetedUniqueValues().size
                })`}
                list={column.id + 'list'}
                disabled={filterVariant === undefined}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </>
  );
};

export default ToolbarFilter;
