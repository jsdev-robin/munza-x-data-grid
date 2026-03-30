'use client';

import Pagination from '../components/pagination';
import TMain from '../components/table/TMain';
import Toolbar from '../components/toolbar';
import { GridContextProvider } from '../contexts/GridContext';
// import '../index.css';
import type { GridProps } from '../types';

const Grid = <T,>({
  columns,
  payload,
  state,
  onColumnFiltersChange,
  onPaginationChange,
  onSortingChange,
  isLoading,
  isError,
  setGlobalFilter,
  getRowCanExpand,
  renderSubComponent,
}: GridProps<T>) => {
  return (
    <GridContextProvider
      payload={payload}
      columns={columns}
      state={state}
      onColumnFiltersChange={onColumnFiltersChange}
      onPaginationChange={onPaginationChange}
      onSortingChange={onSortingChange}
      isLoading={isLoading}
      isError={isError}
      setGlobalFilter={setGlobalFilter}
      getRowCanExpand={getRowCanExpand}
      renderSubComponent={renderSubComponent}
    >
      <div className="relative">
        <div className="flex flex-col gap-3">
          <div className="flex bg-muted rounded-md overflow-hidden border border-border">
            <div className="overflow-hidden flex-1">
              <TMain />
            </div>
            <Toolbar />
          </div>
          <Pagination
            pagination={[
              20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700,
              800, 900, 1000,
            ]}
          />
        </div>
      </div>
    </GridContextProvider>
  );
};

export { Grid };
