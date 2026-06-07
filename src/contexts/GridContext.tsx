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
  type RowSelectionState,
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
  isFetching?: boolean;
  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
   refetch?: () => void;
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
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onSortingChange?: OnChangeFn<SortingState>;
  manualPagination?: boolean;
  enableRowSelection?: boolean
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  refetch?: () => void;
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
  onRowSelectionChange,
  setGlobalFilter,
  manualPagination = false,
  enableRowSelection= true,
  isError,
  isLoading,
  isFetching,
  refetch,
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
    onRowSelectionChange: onRowSelectionChange,
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
    enableRowSelection: enableRowSelection,
    rowCount: payload?.total,
    defaultColumn: {
      minSize: 180,
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
      isFetching,
      refetch,
      globalFilter: state.globalFilter,
      setGlobalFilter,
      renderSubComponent,

    }),
    [
      paneRef1,
      paneRef2,
      isError,
      isLoading,
      isFetching,
      refetch,
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
