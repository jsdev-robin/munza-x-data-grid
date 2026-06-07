'use client';

import Pagination from '../components/pagination';
import TMain from '../components/table/TMain';
import Toolbar from '../components/toolbar';
import { GridContextProvider } from '../contexts/GridContext';
import '../index.css';
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
  manualPagination,
  enableRowSelection,
  isFetching,
  refetch
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
      manualPagination={manualPagination}
      enableRowSelection={enableRowSelection}
      isFetching={isFetching}
      refetch={refetch}
    >
      <div className="mun:relative">
        <div className="mun:space-y-3">
          <div className="mun:flex mun:bg-muted mun:rounded-md mun:overflow-hidden mun:border mun:border-border mun:w-full">
            <div className="mun:overflow-hidden mun:flex-1">
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
