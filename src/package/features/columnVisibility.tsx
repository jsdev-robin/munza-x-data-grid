import type { VisibilityState } from '@tanstack/react-table';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

const COLUMN_VISIBILITY_STORAGE_KEY = 'grid-column-visibility';

export function getStoredColumnVisibility(gridId: string): VisibilityState {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const stored = window.localStorage.getItem(
      `${gridId}:${COLUMN_VISIBILITY_STORAGE_KEY}`,
    );
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function setStoredColumnVisibility(
  gridId: string,
  visibility: VisibilityState,
) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      `${gridId}:${COLUMN_VISIBILITY_STORAGE_KEY}`,
      JSON.stringify(visibility),
    );
  } catch {}
}

export function useColumnVisibilityState(gridId: string) {
  const [columnVisibility, setColumnVisibilityState] =
    useState<VisibilityState>({});

  useEffect(() => {
    setColumnVisibilityState(getStoredColumnVisibility(gridId));
  }, [gridId]);

  const onColumnVisibilityChange: Dispatch<SetStateAction<VisibilityState>> = (
    updater,
  ) => {
    setColumnVisibilityState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredColumnVisibility(gridId, next);
      return next;
    });
  };

  return [columnVisibility, onColumnVisibilityChange] as const;
}
