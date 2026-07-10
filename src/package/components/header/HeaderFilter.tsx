'use client';

import DebouncedInput from '@/components/ui/debounced-input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { useGrid } from '@/package/contexts/GridContext';
import type { Column } from '@tanstack/react-table';

const HeaderFilter = <T,>({ column }: { column: Column<T, unknown> }) => {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const { isFetching } = useGrid();

  const selectValue =
    !isFetching && filterVariant === 'select'
      ? Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000)
      : [];

  return column.getCanFilter() ? (
    <div className="mun:p-1.5 mun:border-t mun:border-border mun:w-full">
      {filterVariant === 'range' ? (
        <div className="mun:flex mun:gap-1.5">
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                value,
                old?.[1],
              ])
            }
            placeholder={`Min`}
          />
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                value,
              ])
            }
            placeholder={`Max`}
          />
        </div>
      ) : filterVariant === 'select' ? (
        <NativeSelect
          value={columnFilterValue?.toString() ?? ''}
          onChange={(e) =>
            column.setFilterValue(
              e.target.value === 'all' ? undefined : e.target.value,
            )
          }
          className="mun:w-full"
        >
          <NativeSelectOption value="">All</NativeSelectOption>
          {selectValue.map((value) => {
            const stringValue =
              typeof value === 'boolean' ? String(value) : value;
            return (
              <NativeSelectOption
                value={stringValue}
                key={stringValue}
                className="capitalize"
              >
                {stringValue}
              </NativeSelectOption>
            );
          })}
        </NativeSelect>
      ) : filterVariant &&
        [
          'text',
          'time',
          'date',
          'datetime-local',
          'month',
          'week',
          'number',
          'tel',
          'url',
          'color',
        ].includes(filterVariant) ? (
        <DebouncedInput
          onChange={(value) => column.setFilterValue(value)}
          placeholder="Search..."
          type={filterVariant}
          value={(columnFilterValue ?? '') as string}
        />
      ) : (
        <div className="mun:h-8 mun:opacity-0 mun:invisible " />
      )}
    </div>
  ) : null;
};

export default HeaderFilter;
