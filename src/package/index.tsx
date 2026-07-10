'use client';

import { GridContextProvider } from './contexts/GridContext';
import TMain from './table/TMain';
import Toolbar from './toolbar';
import type { GridProps } from './types';

const Grid = <T,>({ columns, payload, children }: GridProps<T>) => {
  return (
    <GridContextProvider payload={payload} columns={columns}>
      <GridInner>{children}</GridInner>
    </GridContextProvider>
  );
};

const GridInner = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      {children}
      <div className="mun:relative">
        <div className="mun:space-y-3">
          <div className="mun:flex mun:bg-muted mun:rounded-md mun:overflow-hidden mun:border mun:border-border mun:w-full">
            <div className="mun:overflow-hidden mun:flex-1">
              <TMain />
            </div>
            <Toolbar />
          </div>
        </div>
      </div>
    </>
  );
};

export { Grid };
