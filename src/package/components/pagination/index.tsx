'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { useGrid } from '@/package/contexts/GridContext';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const Pagination = ({ pagination = [] }: { pagination: number[] }) => {
  const { table, isError, isLoading, isFetching } = useGrid();

  return (
    <div className="mun:flex mun:justify-between mun:flex-wrap">
      <div className="mun:flex mun:items-center mun:gap-1">
        <span className="mun:text-sm">
          Page{' '}
          <span className="mun:font-bold">
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </span>
        </span>
        <span className="mun:text-sm">
          (Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
          {table.getRowCount().toLocaleString()} Rows)
        </span>
      </div>
      <div className="mun:flex mun:items-center mun:gap-4 mun:flex-wrap">
        <Input
          type="number"
          className="mun:w-16"
          min="1"
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          disabled={isError || isFetching || isLoading}
        />
        <NativeSelect
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          disabled={isError || isFetching || isLoading}
        >
          {pagination.map((pageSize) => (
            <NativeSelectOption key={pageSize} value={pageSize}>
              Show {pageSize}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <div className="mun:flex mun:items-center mun:gap-2">
          <Button
            size="icon-sm"
            variant="outline"
            onClick={() => table.firstPage()}
            disabled={
              !table.getCanPreviousPage() || isError || isFetching || isLoading
            }
          >
            <ChevronsLeft />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={
              !table.getCanPreviousPage() || isError || isFetching || isLoading
            }
          >
            <ChevronLeft />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={
              !table.getCanNextPage() || isError || isFetching || isLoading
            }
          >
            <ChevronRight />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.lastPage()}
            disabled={
              !table.getCanNextPage() || isError || isFetching || isLoading
            }
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
