'use client';

import TMain from './components/table/TMain';
import Toolbar from './components/toolbar';
import { GridContextProvider } from './contexts/GridContext';
import type { GridProps } from './types';

const Grid = <T,>({ columns, payload, isToolbar, children }: GridProps<T>) => {
  return (
    <GridContextProvider payload={payload} columns={columns}>
      <GridInner isToolbar={isToolbar}>{children}</GridInner>
    </GridContextProvider>
  );
};

const GridInner = ({
  children,
  isToolbar = true,
}: {
  children?: React.ReactNode;
  isToolbar?: boolean;
}) => {
  return (
    <>
      {children}
      <div className="mun:relative">
        <div className="mun:space-y-3">
          <div className="mun:flex mun:bg-muted mun:rounded-md mun:overflow-hidden mun:border mun:border-border mun:w-full">
            <div className="mun:overflow-hidden mun:flex-1">
              <TMain />
            </div>
            {isToolbar && <Toolbar />}
          </div>
        </div>
      </div>
    </>
  );
};

export { Grid };
