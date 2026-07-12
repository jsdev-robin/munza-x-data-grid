'use client';

import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Updater,
} from '@tanstack/react-table';
import { useCallback } from 'react';
import { create } from 'zustand';

const DEFAULT_PAGINATION: PaginationState = { pageIndex: 0, pageSize: 20 };

interface GridTableStore {
  pagination: Record<string, PaginationState>;
  sorting: Record<string, SortingState>;
  globalFilter: Record<string, string>;
  columnFilters: Record<string, ColumnFiltersState>;
  setPagination: (name: string, updater: Updater<PaginationState>) => void;
  setSorting: (name: string, updater: Updater<SortingState>) => void;
  setGlobalFilter: (name: string, updater: Updater<string>) => void;
  setColumnFilters: (
    name: string,
    updater: Updater<ColumnFiltersState>,
  ) => void;
}

function resolve<T>(updater: Updater<T>, old: T): T {
  return typeof updater === 'function'
    ? (updater as (old: T) => T)(old)
    : updater;
}

export const useGridTableStore = create<GridTableStore>((set) => ({
  pagination: {},
  sorting: {},
  globalFilter: {},
  columnFilters: {},
  setPagination: (name, updater) =>
    set((state) => ({
      pagination: {
        ...state.pagination,
        [name]: resolve(updater, state.pagination[name] ?? DEFAULT_PAGINATION),
      },
    })),
  setSorting: (name, updater) =>
    set((state) => ({
      sorting: {
        ...state.sorting,
        [name]: resolve(updater, state.sorting[name] ?? []),
      },
    })),
  setGlobalFilter: (name, updater) =>
    set((state) => ({
      globalFilter: {
        ...state.globalFilter,
        [name]: resolve(updater, state.globalFilter[name] ?? ''),
      },
    })),
  setColumnFilters: (name, updater) =>
    set((state) => ({
      columnFilters: {
        ...state.columnFilters,
        [name]: resolve(updater, state.columnFilters[name] ?? []),
      },
    })),
}));

export function useGridTableState(name: string) {
  const pagination = useGridTableStore(
    (s) => s.pagination[name] ?? DEFAULT_PAGINATION,
  );
  const sorting = useGridTableStore((s) => s.sorting[name] ?? []);
  const globalFilter = useGridTableStore((s) => s.globalFilter[name] ?? '');
  const columnFilters = useGridTableStore((s) => s.columnFilters[name] ?? []);

  const setPaginationRaw = useGridTableStore((s) => s.setPagination);
  const setSortingRaw = useGridTableStore((s) => s.setSorting);
  const setGlobalFilterRaw = useGridTableStore((s) => s.setGlobalFilter);
  const setColumnFiltersRaw = useGridTableStore((s) => s.setColumnFilters);

  const setPagination = useCallback(
    (updater: Updater<PaginationState>) => setPaginationRaw(name, updater),
    [name, setPaginationRaw],
  );
  const setSorting = useCallback(
    (updater: Updater<SortingState>) => setSortingRaw(name, updater),
    [name, setSortingRaw],
  );
  const setGlobalFilter = useCallback(
    (updater: Updater<string>) => setGlobalFilterRaw(name, updater),
    [name, setGlobalFilterRaw],
  );
  const setColumnFilters = useCallback(
    (updater: Updater<ColumnFiltersState>) =>
      setColumnFiltersRaw(name, updater),
    [name, setColumnFiltersRaw],
  );

  return [
    pagination,
    sorting,
    globalFilter,
    setGlobalFilter,
    setPagination,
    setSorting,
    columnFilters,
    setColumnFilters,
  ] as const;
}
