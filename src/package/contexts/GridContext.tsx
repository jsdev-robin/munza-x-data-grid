'use client';

import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type Table,
} from '@tanstack/react-table';
import React, { createContext, useContext } from 'react';

export interface GridContextProps<T> {
  table: Table<T>;
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
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <GridContext.Provider
      value={{
        table,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export function useGrid<T = unknown>() {
  const context = useContext(GridContext) as
    | GridContextProviderProps<T>
    | undefined;

  if (!context) {
    throw new Error('useGrid must be used within a GridContextProvider');
  }
  return context;
}
