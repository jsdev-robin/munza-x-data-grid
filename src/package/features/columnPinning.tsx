import type { ColumnPinningState } from '@tanstack/react-table';
import { useState, type Dispatch, type SetStateAction } from 'react';

const COLUMN_PINNING_STORAGE_KEY = 'grid-column-pinning';

export function getStoredColumnPinning(): ColumnPinningState {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const stored = window.localStorage.getItem(COLUMN_PINNING_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function setStoredColumnPinning(pinning: ColumnPinningState) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      COLUMN_PINNING_STORAGE_KEY,
      JSON.stringify(pinning),
    );
  } catch {}
}

export function useColumnPinningState() {
  const [columnPinning, setColumnPinningState] = useState<ColumnPinningState>(
    getStoredColumnPinning,
  );

  const onColumnPinningChange: Dispatch<SetStateAction<ColumnPinningState>> = (
    updater,
  ) => {
    setColumnPinningState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredColumnPinning(next);
      return next;
    });
  };

  return [columnPinning, onColumnPinningChange] as const;
}
