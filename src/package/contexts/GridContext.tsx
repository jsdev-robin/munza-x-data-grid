'use client';

import type { ColumnPinningState } from '@tanstack/react-table';
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
import { useColumnPinningState } from '../features/columnPinning';
import { useColumnVisibilityState } from '../features/columnVisibility';
import {
  DensityFeature,
  getStoredDensity,
  type DensityState,
} from '../features/rowDensity';
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
}

const GridContext = createContext<GridContextProps<any> | undefined>(undefined);

interface GridContextProviderProps<T> {
  children: React.ReactNode;
  payload?: {
    data: T[];
    total: number;
  };
  columns: ColumnDef<T>[];
  isFetching?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

export const GridContextProvider = <T,>({
  children,
  payload,
  columns,
  isFetching,
  isLoading,
  isError,
}: GridContextProviderProps<T>) => {
  const [density, setDensity] = React.useState<DensityState>(getStoredDensity);
  const [columnVisibility, onColumnVisibilityChange] =
    useColumnVisibilityState();
  const [columnPinning, onColumnPinningChange] = useColumnPinningState();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [isSplit, setIsSplit] = useSplitViewState();

  const table = useReactTable({
    _features: [DensityFeature],
    data: payload?.data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      density,
      columnFilters,
      globalFilter,
      columnVisibility,
      columnPinning,
    },
    onDensityChange: setDensity,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: onColumnVisibilityChange,
    onColumnPinningChange: onColumnPinningChange,
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
      isSplit,
      setIsSplit,
      columnPinning,
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
      isSplit,
      setIsSplit,
      columnPinning,
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
