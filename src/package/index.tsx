'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Pagination from './components/pagination';
import TGetLeftMain from './components/table/TGetLeftMain';
import TGetRightMain from './components/table/TGetRightMain';
import TMain from './components/table/TMain';
import Toolbar from './components/toolbar';
import { GridContextProvider, useGrid } from './contexts/GridContext';
import type { GridProps } from './types';

const Grid = <T,>({
  columns,
  payload,
  isToolbar,
  children,
  name,
}: GridProps<T>) => {
  return (
    <GridContextProvider payload={payload} columns={columns} name={name}>
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
  const { gridWrapperRef } = useGrid();
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (tableWrapperRef.current) {
      setTableHeight(tableWrapperRef.current.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    const el = tableWrapperRef.current;
    if (!el) return;
    const updateHeight = () => {
      setTableHeight(el.getBoundingClientRect().height);
    };
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);

    document.addEventListener('fullscreenchange', updateHeight);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      document.removeEventListener('fullscreenchange', updateHeight);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div ref={gridWrapperRef}>
      {children}
      <div className="mun:relative">
        <div className="mun:space-y-2">
          <div className="mun:flex mun:items-start mun:bg-muted mun:rounded-md mun:overflow-hidden mun:border mun:border-border mun:w-full">
            <TGetLeftMain />
            <div
              className="mun:overflow-hidden mun:flex-1"
              ref={tableWrapperRef}
            >
              <TMain />
            </div>
            <TGetRightMain />
            {isToolbar && <Toolbar height={tableHeight} />}
          </div>
          <Pagination pagination={[20, 30, 40, 50, 60, 70, 80, 90, 100]} />
        </div>
      </div>
    </div>
  );
};

export { Grid };
