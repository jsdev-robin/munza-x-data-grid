'use client';

import { GridContextProvider } from './contexts/GridContext';
import TMain from './table/TMain';
import type { GridProps } from './types';

const Grid = <T,>({ columns, payload }: GridProps<T>) => {
  return (
    <GridContextProvider payload={payload} columns={columns}>
      <TMain />
    </GridContextProvider>
  );
};

export { Grid };
