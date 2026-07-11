import { useState, type Dispatch, type SetStateAction } from 'react';

const COLUMN_ORDER_STORAGE_KEY = 'grid-column-order';

export function getStoredColumnOrder(
  gridId: string,
  defaultOrder: string[],
): string[] {
  if (typeof window === 'undefined') {
    return defaultOrder;
  }
  try {
    const stored = window.localStorage.getItem(
      `${gridId}:${COLUMN_ORDER_STORAGE_KEY}`,
    );
    if (!stored) return defaultOrder;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : defaultOrder;
  } catch {
    return defaultOrder;
  }
}

export function setStoredColumnOrder(gridId: string, order: string[]) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      `${gridId}:${COLUMN_ORDER_STORAGE_KEY}`,
      JSON.stringify(order),
    );
  } catch {}
}

export function useColumnOrderState(gridId: string, defaultOrder: string[]) {
  const [columnOrder, setColumnOrderState] = useState<string[]>(() =>
    getStoredColumnOrder(gridId, defaultOrder),
  );

  const onColumnOrderChange: Dispatch<SetStateAction<string[]>> = (updater) => {
    setColumnOrderState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredColumnOrder(gridId, next);
      return next;
    });
  };

  return [columnOrder, onColumnOrderChange] as const;
}
