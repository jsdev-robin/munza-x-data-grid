import {
  functionalUpdate,
  makeStateUpdater,
  type OnChangeFn,
  type RowData,
  type Table,
  type TableFeature,
  type Updater,
} from '@tanstack/react-table';

// TypeScript setup for our new feature with all of the same type-safety as stock TanStack Table features

export type DensityState = 'sm' | 'md' | 'lg';
export interface DensityTableState {
  density: DensityState;
}

export interface DensityOptions {
  enableDensity?: boolean;
  onDensityChange?: OnChangeFn<DensityState>;
  gridId?: string;
}

export interface DensityInstance {
  setDensity: (updater: Updater<DensityState>) => void;
  toggleDensity: (value?: DensityState) => void;
}

declare module '@tanstack/react-table' {
  interface TableState extends DensityTableState {}
  interface TableOptionsResolved<
    TData extends RowData,
  > extends DensityOptions {}
  interface Table<TData extends RowData> extends DensityInstance {}
}

// end of TS setup!

const DENSITY_STORAGE_KEY = 'table-density';

export const DensityFeature: TableFeature<any> = {
  // No gridId available here — TanStack only calls this with (state).
  // Real initial value is supplied externally via GridContext's controlled
  // `state.density`, so this default is just a safe fallback.
  getInitialState: (state): DensityTableState => {
    return {
      density: 'md',
      ...state,
    };
  },

  getDefaultOptions: <TData extends RowData>(
    table: Table<TData>,
  ): DensityOptions => {
    return {
      enableDensity: true,
      onDensityChange: makeStateUpdater('density', table),
    } as DensityOptions;
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.setDensity = (updater) => {
      const gridId = table.options.gridId ?? 'default';
      const safeUpdater: Updater<DensityState> = (old) => {
        let newState = functionalUpdate(updater, old);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(
            `${gridId}:${DENSITY_STORAGE_KEY}`,
            newState,
          );
        }
        return newState;
      };
      return table.options.onDensityChange?.(safeUpdater);
    };
    table.toggleDensity = (value) => {
      table.setDensity((old) => {
        if (value) return value;
        return old === 'lg' ? 'md' : old === 'md' ? 'sm' : 'lg'; //cycle through the 3 options
      });
    };
  },
};
//end of custom feature code

export const getStoredDensity = (gridId: string): DensityState => {
  if (typeof window === 'undefined') return 'md';
  const value = window.localStorage.getItem(`${gridId}:${DENSITY_STORAGE_KEY}`);
  if (value === 'sm' || value === 'md' || value === 'lg') {
    return value;
  }
  return 'md';
};
