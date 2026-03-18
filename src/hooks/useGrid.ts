import { useContext } from 'react';
import GridContext, { type GridContextProps } from '../contexts/GridContext';

export function useGrid() {
  const context = useContext(
    GridContext as React.Context<GridContextProps<unknown> | null>,
  );

  if (!context) {
    throw new Error('useGrid must be used within a GridContextProvider');
  }
  return context;
}
