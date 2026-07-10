import type { ColumnFiltersState, Updater } from '@tanstack/react-table';
import { create } from 'zustand';
import { getStoredDensity, type DensityState } from '../features/rowDensity';

interface GridState {
  density: DensityState;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  setDensity: (updater: Updater<DensityState>) => void;
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void;
  setGlobalFilter: (updater: Updater<string>) => void;
}

const resolve = <V>(updater: Updater<V>, old: V): V =>
  typeof updater === 'function' ? (updater as (old: V) => V)(old) : updater;

export const useGridStore = create<GridState>((set) => ({
  density: getStoredDensity(),
  columnFilters: [],
  globalFilter: '',
  setDensity: (updater) =>
    set((s) => ({ density: resolve(updater, s.density) })),
  setColumnFilters: (updater) =>
    set((s) => ({ columnFilters: resolve(updater, s.columnFilters) })),
  setGlobalFilter: (updater) =>
    set((s) => ({ globalFilter: resolve(updater, s.globalFilter) })),
}));
