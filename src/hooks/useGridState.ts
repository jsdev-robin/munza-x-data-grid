import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import React from 'react';

export const useGridState = () => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowSelection, setRowSelection] = React.useState({});

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const state = {
    columnFilters,
    globalFilter,
    pagination,
    sorting,
    rowSelection
  };

  const handlers = {
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    setGlobalFilter,
    onRowSelectionChange: setRowSelection,
  };

  return { state, handlers, rowSelection  };
};
