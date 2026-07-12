'use client';

import type { Column } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import DebouncedInput from '@/components/ui/debounced-input';
import { useGrid } from '@/package/contexts/GridContext';
import { ChevronDown, ChevronRight, ListRestart } from 'lucide-react';

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
            <span className="mun:truncate">
              {sortedUniqueValues?.id && sortedUniqueValues.id.length > 15
                ? `${sortedUniqueValues.id.slice(0, 15)}...`
                : sortedUniqueValues?.id}
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mun:p-1.5 mun:pr-0">
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

const ToolbarFilters = () => {
  const { table, globalFilter, setGlobalFilter } = useGrid();

  return (
    <div className="mun:flex mun:flex-col mun:gap-1.5 mun:h-full mun:py-1.5">
      <div className="mun:flex mun:items-center mun:justify-between mun:px-1.5 mun:pb-2.5 mun:border-b mun:border-border">
        <h1 className="mun:text-sm mun:font-bold">Filters</h1>
      </div>
      <div className="mun:px-1.5">
        <DebouncedInput
          value={String(globalFilter)}
          onChange={(value) => {
            setGlobalFilter?.(String(value));
          }}
          placeholder="Search all columns..."
        />
      </div>
      <div
        className="mun:space-y-2 mun:px-1.5 mun:flex-1 mun:overflow-y-auto mun:[&::-webkit-scrollbar]:w-2
  mun:[&::-webkit-scrollbar-track]:bg-stone-100
  mun:[&::-webkit-scrollbar-thumb]:bg-stone-300
  mun:dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  mun:dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <React.Fragment key={headerGroup.id}>
            {headerGroup.headers
              .filter((header) => !['rowNumber'].includes(header.column.id))
              .map((header) => (
                <ToolbarFilter key={header.id} column={header.column} />
              ))}
          </React.Fragment>
        ))}
      </div>
      <div className="mun:px-1.5">
        <Button
          onClick={() => table.setColumnFilters([])}
          variant="outline"
          size="xs"
        >
          <ListRestart />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default ToolbarFilters;
