import type { ColumnSizingState } from '@tanstack/react-table';
import { useState, type Dispatch, type SetStateAction } from 'react';

const COLUMN_SIZING_STORAGE_KEY = 'grid-column-sizing';

export function getStoredColumnSizing(): ColumnSizingState {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const stored = window.localStorage.getItem(COLUMN_SIZING_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function setStoredColumnSizing(sizing: ColumnSizingState) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      COLUMN_SIZING_STORAGE_KEY,
      JSON.stringify(sizing),
    );
  } catch {}
}

export function useColumnSizingState() {
  const [columnSizing, setColumnSizingState] = useState<ColumnSizingState>(
    getStoredColumnSizing,
  );

  const onColumnSizingChange: Dispatch<SetStateAction<ColumnSizingState>> = (
    updater,
  ) => {
    setColumnSizingState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredColumnSizing(next);
      return next;
    });
  };

  return [columnSizing, onColumnSizingChange] as const;
}
