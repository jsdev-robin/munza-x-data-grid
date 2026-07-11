import { useState, type Dispatch, type SetStateAction } from 'react';

const SPLIT_VIEW_STORAGE_KEY = 'grid-is-split';

export function getStoredIsSplit(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const stored = window.localStorage.getItem(SPLIT_VIEW_STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  } catch {
    return false;
  }
}

export function setStoredIsSplit(isSplit: boolean) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      SPLIT_VIEW_STORAGE_KEY,
      JSON.stringify(isSplit),
    );
  } catch {}
}

export function useSplitViewState() {
  const [isSplit, setIsSplitState] = useState<boolean>(getStoredIsSplit);

  const setIsSplit: Dispatch<SetStateAction<boolean>> = (updater) => {
    setIsSplitState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredIsSplit(next);
      return next;
    });
  };

  return [isSplit, setIsSplit] as const;
}
