'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useGrid } from '../../hooks/useGrid';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { NativeSelect, NativeSelectOption } from '../ui/native-select';

const Pagination = ({ pagination = [] }: { pagination: number[] }) => {
  const { table } = useGrid();

  return (
    <div className="flex items-center justify-between flex-wrap">
      <span className="flex items-center gap-1">
        <span className="mum:text-xs">Page</span>
        <span className="text-sm">
          {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount().toLocaleString()}
        </span>
      </span>
      <div className="flex items-center gap-4 flex-wrap">
        <Input
          type="number"
          className="w-16"
          min="1"
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
        />
        <NativeSelect
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {pagination.map((pageSize) => (
            <NativeSelectOption key={pageSize} value={pageSize}>
              Show {pageSize}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
