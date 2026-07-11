'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import TGetLeftMain from './components/table/TGetLeftMain';
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
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (tableWrapperRef.current) {
      setTableHeight(tableWrapperRef.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      {children}
      <div className="mun:relative">
        <div className="mun:space-y-3">
          <div className="mun:flex mun:bg-muted mun:rounded-md mun:overflow-hidden mun:border mun:border-border mun:w-full">
            <TGetLeftMain />
            <div
              className="mun:overflow-hidden mun:flex-1"
              ref={tableWrapperRef}
            >
              <TMain />
            </div>
            {isToolbar && <Toolbar height={tableHeight} />}
          </div>
        </div>
      </div>
    </>
  );
};

export { Grid };
