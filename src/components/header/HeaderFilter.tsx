'use client';

import type { Column } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import DebouncedInput from '../ui/debounced-input';
import { NativeSelect, NativeSelectOption } from '../ui/native-select';

const HeaderFilter = <T,>({ column }: { column: Column<T, unknown> }) => {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const [selectValue, setSelectValue] = useState<string[]>([]);

  useEffect(() => {
    if (filterVariant === 'select') {
      const values = Array.from(column.getFacetedUniqueValues().keys())
        .sort()
        .slice(0, 5000);
      Promise.resolve().then(() => setSelectValue(values));
    }
  }, [filterVariant, column]);

  return column.getCanFilter() ? (
    <div className="p-1.5 border-t border-border w-full">
      {filterVariant === 'range' ? (
        <div className="flex gap-1.5">
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
          className="w-full"
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
        <div className="h-8 opacity-0 invisible " />
      )}
    </div>
  ) : null;
};

export default HeaderFilter;
