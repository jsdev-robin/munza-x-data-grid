/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  type Table,
  type TableState,
} from '@tanstack/react-table';
import React, { createContext, useMemo, useRef } from 'react';
import useSyncScroll from '../hooks/useSyncScroll';

export interface GridContextProps<T> {
  table: Table<T>;
  isLoading?: boolean;
  isError?: boolean;
  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
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
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
}

export const GridContextProvider = <T,>({
  children,
  payload,
  columns,
  state = {},
  onColumnFiltersChange,
  onPaginationChange,
  onSortingChange,
  globalFilter,
  setGlobalFilter,
  manualPagination = false,
  isError,
  isLoading,
}: GridContextProviderProps<T>) => {
  const [columnPinning, setColumnPinning] = React.useState({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data: payload?.data ?? [],
    columns,
    state: {
      ...state,
      columnPinning,
      globalFilter,
      expanded,
    },
    getSubRows: (row: T) => (row as any).subRows,
    onColumnFiltersChange: onColumnFiltersChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    defaultColumn: {
      size: 180,
      minSize: 180,
      maxSize: 180,
    },
  });

  const paneRef1 = useRef<HTMLDivElement>(null);
  const paneRef2 = useRef<HTMLDivElement>(null);

  useSyncScroll({
    refs: [paneRef1, paneRef2],
    axis: 'x',
  });

  const contextValue = useMemo(
    () => ({
      paneRef1,
      paneRef2,
      isError,
      isLoading,
      globalFilter,
      setGlobalFilter,
    }),
    [globalFilter, isError, isLoading, setGlobalFilter],
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
