import type { ColumnPinningState } from '@tanstack/react-table';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

const COLUMN_PINNING_STORAGE_KEY = 'grid-column-pinning';

export function getStoredColumnPinning(gridId: string): ColumnPinningState {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const stored = window.localStorage.getItem(
      `${gridId}:${COLUMN_PINNING_STORAGE_KEY}`,
    );
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function setStoredColumnPinning(
  gridId: string,
  pinning: ColumnPinningState,
) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      `${gridId}:${COLUMN_PINNING_STORAGE_KEY}`,
      JSON.stringify(pinning),
    );
  } catch {}
}

export function useColumnPinningState(gridId: string) {
  const [columnPinning, setColumnPinningState] = useState<ColumnPinningState>(
    {},
  );

  useEffect(() => {
    setColumnPinningState(getStoredColumnPinning(gridId));
  }, [gridId]);

  const onColumnPinningChange: Dispatch<SetStateAction<ColumnPinningState>> = (
    updater,
  ) => {
    setColumnPinningState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredColumnPinning(gridId, next);
      return next;
    });
  };

  return [columnPinning, onColumnPinningChange] as const;
}
