'use client';

import Pagination from '../components/pagination';
import TMain from '../components/table/TMain';
import Toolbar from '../components/toolbar';
import { GridContextProvider } from '../contexts/GridContext';
import '../index.css';
import type { GridProps } from '../types';

const Grid = <T,>({ columns, payload }: GridProps<T>) => {
  return (
    <GridContextProvider payload={payload} columns={columns}>
      <div className="mun:flex mun:flex-col mun:gap-3">
        <div className="mun:flex mun:bg-muted mun:rounded-md mun:overflow-hidden mun:border mun:border-border">
          <div className="mun:overflow-hidden mun:flex-1">
            <TMain />
          </div>
          <Toolbar />
        </div>
        <Pagination pagination={[20, 30, 40, 50, 60, 70, 80, 90, 100]} />
      </div>
    </GridContextProvider>
  );
};

export { Grid };
