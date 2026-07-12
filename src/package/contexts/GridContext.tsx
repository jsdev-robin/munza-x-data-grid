'use client';

import type {
  ColumnPinningState,
  ExpandedState,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  TableState,
} from '@tanstack/react-table';
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Table,
} from '@tanstack/react-table';
import React, { createContext, useContext, useMemo, useRef } from 'react';
import { useColumnOrderState } from '../features/columnOrder';
import { useColumnPinningState } from '../features/columnPinning';
import { useColumnSizingState } from '../features/columnSizing';
import { useColumnVisibilityState } from '../features/columnVisibility';
import {
  DensityFeature,
  getStoredDensity,
  type DensityState,
} from '../features/rowDensity';
import { useRowPinningState } from '../features/rowPinning';
import { useSplitViewState } from '../features/splitView';
import useSyncScroll from '../hooks/useSyncScroll';

export interface GridContextProps<T> {
  table: Table<T>;
  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
  paneRef3: React.RefObject<HTMLDivElement | null>;
  paneRef4: React.RefObject<HTMLDivElement | null>;
  paneRef5: React.RefObject<HTMLDivElement | null>;
  paneRef6: React.RefObject<HTMLDivElement | null>;
  density: DensityState;
  isFetching?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isSplit: boolean;
  setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
  columnPinning: ColumnPinningState;
  gridWrapperRef: React.RefObject<HTMLDivElement | null>;
  globalFilter: string;
  refetch?: () => void;
  height?: string;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
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
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onSortingChange?: OnChangeFn<SortingState>;
  manualPagination?: boolean;
  enableRowSelection?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  refetch?: () => void;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  getRowCanExpand?: (row: Row<T>) => boolean;
  name?: string;
  height?: string;
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
  enableRowSelection = true,
  isError,
  isLoading,
  isFetching,
  refetch,
  getRowCanExpand,
  renderSubComponent,
  name = 'munza',
  height,
}: GridContextProviderProps<T>) => {
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const [density, setDensity] = React.useState<DensityState>(() =>
    getStoredDensity(name),
  );
  const [columnVisibility, onColumnVisibilityChange] =
    useColumnVisibilityState(name);
  const [columnPinning, onColumnPinningChange] = useColumnPinningState(name);

  const [columnOrder, onColumnOrderChange] = useColumnOrderState(
    name,
    useMemo(() => columns.map((c) => c.id!), [columns]),
  );
  const [isSplit, setIsSplit] = useSplitViewState(name);
  const [columnSizing, onColumnSizingChange] = useColumnSizingState(name);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [rowPinning, onRowPinningChange] = useRowPinningState(name);

  const table = useReactTable({
    _features: [DensityFeature],
    data: payload?.data ?? [],
    columns: columns,
    gridId: name,
    rowCount: payload?.total,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      ...state,
      density,
      columnVisibility,
      columnPinning,
      columnOrder,
      columnSizing,
      expanded,
      rowPinning,
    },
    getSubRows: (row: T) => (row as any).subRows,
    getRowCanExpand,
    manualPagination: manualPagination,
    enableRowSelection: enableRowSelection,
    onRowSelectionChange: onRowSelectionChange,
    onDensityChange: setDensity,
    onColumnFiltersChange: onColumnFiltersChange,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: onColumnVisibilityChange,
    onColumnPinningChange: onColumnPinningChange,
    onColumnOrderChange: onColumnOrderChange,
    onColumnSizingChange: onColumnSizingChange,
    onPaginationChange: onPaginationChange,
    onSortingChange: onSortingChange,
    onExpandedChange: setExpanded,
    onRowPinningChange: onRowPinningChange,
    defaultColumn: {
      minSize: 60,
      maxSize: 800,
    },
  });

  const paneRef1 = useRef<HTMLDivElement>(null);
  const paneRef2 = useRef<HTMLDivElement>(null);
  const paneRef3 = useRef<HTMLDivElement>(null);
  const paneRef4 = useRef<HTMLDivElement>(null);
  const paneRef5 = useRef<HTMLDivElement>(null);
  const paneRef6 = useRef<HTMLDivElement>(null);

  useSyncScroll({
    refs: [paneRef1, paneRef2],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef3, paneRef4],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef5, paneRef6],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef2, paneRef3, paneRef4, paneRef5, paneRef6],
    axis: 'y',
  });

  const contextValue = useMemo(
    () => ({
      paneRef1,
      paneRef2,
      paneRef3,
      paneRef4,
      paneRef5,
      paneRef6,
      density,
      isFetching,
      isLoading,
      isError,
      refetch,
      isSplit,
      setIsSplit,
      columnPinning,
      gridWrapperRef,
      globalFilter: state.globalFilter,
      renderSubComponent,
      height,
      setGlobalFilter,
    }),
    [
      paneRef1,
      paneRef2,
      paneRef3,
      paneRef4,
      paneRef5,
      paneRef6,
      density,
      isFetching,
      isLoading,
      isError,
      refetch,
      isSplit,
      setIsSplit,
      columnPinning,
      gridWrapperRef,
      state.globalFilter,
      renderSubComponent,
      height,
      setGlobalFilter,
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

export function useGrid() {
  const context = useContext(
    GridContext as React.Context<GridContextProps<unknown> | null>,
  );

  if (!context) {
    throw new Error('useGrid must be used within a GridContextProvider');
  }
  return context;
}
