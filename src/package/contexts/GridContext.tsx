'use client';

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
import {
  DensityFeature,
  getStoredDensity,
  type DensityState,
} from '../features/rowDensity';
import useSyncScroll from '../hooks/useSyncScroll';

export interface GridContextProps<T> {
  table: Table<T>;
  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
  density: DensityState;
  isFetching?: boolean;
  isLoading?: boolean;
  isError?: boolean;
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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnVisibility, setColumnVisibility] = React.useState({});

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
    },
    onDensityChange: setDensity,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
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
      density,
      isFetching,
      isLoading,
      isError,
    }),
    [paneRef1, paneRef2, density, isFetching, isLoading, isError],
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
