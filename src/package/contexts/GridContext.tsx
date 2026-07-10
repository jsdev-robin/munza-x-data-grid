'use client';

import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type Table,
} from '@tanstack/react-table';
import React, { createContext, useContext, useMemo, useRef } from 'react';
import useSyncScroll from '../hooks/useSyncScroll';

export interface GridContextProps<T> {
  table: Table<T>;
  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
}

const GridContext = createContext<GridContextProps<any> | undefined>(undefined);

interface GridContextProviderProps<T> {
  children: React.ReactNode;
  payload?: {
    data: T[];
    total: number;
  };
  columns: ColumnDef<T>[];
}

export const GridContextProvider = <T,>({
  children,
  payload,
  columns,
}: GridContextProviderProps<T>) => {
  const table = useReactTable({
    data: payload?.data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
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
    }),
    [paneRef1, paneRef2],
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
