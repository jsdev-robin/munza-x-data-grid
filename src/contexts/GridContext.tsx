/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type SortingState,
  type Table,
  type TableState,
} from '@tanstack/react-table';
import React, { createContext, useMemo } from 'react';

export interface GridContextProps<T> {
  table: Table<T>;
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
}

const GridContext = createContext<GridContextProps<any> | undefined>(undefined);

interface GridContextProviderProps<T> {
  children: React.ReactNode;
  payload?: {
    data: T[];
    total: number;
  };
  columns: ColumnDef<T>[];
  state?: Partial<TableState>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onSortingChange?: OnChangeFn<SortingState>;
  manualPagination?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  getRowCanExpand?: (row: Row<T>) => boolean;
}

export const GridContextProvider = <T,>({
  children,
  payload,
  columns,
  state = {},
  onColumnFiltersChange,
  onPaginationChange,
  onSortingChange,
  setGlobalFilter,
  manualPagination = false,
  isError,
  isLoading,
  isFetching,
  getRowCanExpand,
  renderSubComponent,
}: GridContextProviderProps<T>) => {
  const [columnPinning, setColumnPinning] = React.useState({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data: payload?.data ?? [],
    columns,
    state: {
      ...state,
      columnPinning,
      expanded,
    },
    getSubRows: (row: T) => (row as any).subRows,
    getRowCanExpand,
    onColumnFiltersChange: onColumnFiltersChange,
    getCoreRowModel: getCoreRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getExpandedRowModel: getExpandedRowModel(),
    onPaginationChange: onPaginationChange,
    onSortingChange: onSortingChange,
    onColumnPinningChange: setColumnPinning,
    onGlobalFilterChange: setGlobalFilter,
    onExpandedChange: setExpanded,
    manualPagination: manualPagination,
    rowCount: payload?.total,
    defaultColumn: {
      size: 180,
      minSize: 180,
      maxSize: 180,
    },
  });

  const contextValue = useMemo(
    () => ({
      isError,
      isLoading,
      isFetching,
      globalFilter: state.globalFilter,
      setGlobalFilter,
      renderSubComponent,
    }),
    [
      isError,
      isLoading,
      isFetching,
      state.globalFilter,
      setGlobalFilter,
      renderSubComponent,
    ],
  );

  return (
    <GridContext.Provider
      value={{
        ...contextValue,
        table,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export default GridContext;
