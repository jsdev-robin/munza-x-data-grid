/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Table,
} from '@tanstack/react-table';
import React, { createContext, useMemo, useRef } from 'react';
import useSyncScroll from '../hooks/useSyncScroll';

export interface GridContextProps<T> {
  table: Table<T>;
  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
  paneRef3: React.RefObject<HTMLDivElement | null>;
  paneRef4: React.RefObject<HTMLDivElement | null>;
  paneRef5: React.RefObject<HTMLDivElement | null>;
  paneRef6: React.RefObject<HTMLDivElement | null>;
  paneRef7: React.RefObject<HTMLDivElement | null>;
}

const GridContext = createContext<GridContextProps<any> | undefined>(undefined);

interface GridContextProviderProps<T> {
  children: React.ReactNode;
  payload?: {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
  };
  columns: ColumnDef<T>[];
}

export const GridContextProvider = <T,>({
  children,
  payload,
  columns,
}: GridContextProviderProps<T>) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const table = useReactTable({
    data: payload?.data ?? [],
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
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
  const paneRef3 = useRef<HTMLDivElement>(null);
  const paneRef4 = useRef<HTMLDivElement>(null);
  const paneRef5 = useRef<HTMLDivElement>(null);
  const paneRef6 = useRef<HTMLDivElement>(null);
  const paneRef7 = useRef<HTMLDivElement>(null);

  useSyncScroll({
    refs: [paneRef1, paneRef2],
    axis: 'x',
  });

  const contextValue = useMemo(
    () => ({
      paneRef1,
      paneRef2,
      paneRef3,
      paneRef4,
      paneRef5,
      paneRef6,
      paneRef7,
    }),
    [paneRef1, paneRef2, paneRef3, paneRef4, paneRef5, paneRef6, paneRef7],
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
