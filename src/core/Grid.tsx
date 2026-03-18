'use client';

import TMain from '../components/table/TMain';
import { GridContextProvider } from '../contexts/GridContext';
import '../index.css';
import type { GridProps } from '../types';

const Grid = <T,>({ columns, payload }: GridProps<T>) => {
  return (
    <GridContextProvider payload={payload} columns={columns}>
      <div className="mun:overflow-hidden mun:flex-1  mun:rounded-md">
        <TMain />
      </div>
    </GridContextProvider>
  );
};

export { Grid };
