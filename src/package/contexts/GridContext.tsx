'use client';

import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type Table,
} from '@tanstack/react-table';
import React, { createContext } from 'react';

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
    columns: columns,
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
