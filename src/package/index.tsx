'use client';

import { GridContextProvider } from './contexts/GridContext';
import type { GridProps } from './types';

const Grid = <T,>({ columns, payload }: GridProps<T>) => {
  return (
    <GridContextProvider payload={payload} columns={columns}>
      d
    </GridContextProvider>
  );
};

export { Grid };
