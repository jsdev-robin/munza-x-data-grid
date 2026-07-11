import type { VisibilityState } from '@tanstack/react-table';
import { useState, type Dispatch, type SetStateAction } from 'react';

const COLUMN_VISIBILITY_STORAGE_KEY = 'grid-column-visibility';

export function getStoredColumnVisibility(): VisibilityState {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const stored = window.localStorage.getItem(COLUMN_VISIBILITY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function setStoredColumnVisibility(visibility: VisibilityState) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      COLUMN_VISIBILITY_STORAGE_KEY,
      JSON.stringify(visibility),
    );
  } catch {}
}

export function useColumnVisibilityState() {
  const [columnVisibility, setColumnVisibilityState] =
    useState<VisibilityState>(getStoredColumnVisibility);

  const onColumnVisibilityChange: Dispatch<SetStateAction<VisibilityState>> = (
    updater,
  ) => {
    setColumnVisibilityState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredColumnVisibility(next);
      return next;
    });
  };

  return [columnVisibility, onColumnVisibilityChange] as const;
}
