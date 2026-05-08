'use client';

import { Input } from '@/components/ui/Input';
import {
  Columns,
  Filter,
  ListRestart,
  RefreshCw,
  Settings,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useGrid } from '../../hooks/useGrid';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import DebouncedInput from '../ui/debounced-input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import ToolbarFilter from './ToolbarFilter';

const Toolbar = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };
  const { table, globalFilter, setGlobalFilter, refetch, isFetching } =
    useGrid();

  const [searchTerm, setSearchTerm] = useState('');
  const visibleColumns = useMemo(() => {
    return table
      .getAllLeafColumns()
      .filter((column) => !['rowNumber'].includes(column.id))
      .filter((column) =>
        column.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [searchTerm, table]);

  return (
    <div className="mun:bg-muted mun:overflow-hidden mun:hidden mun:sm:flex">
      {activePanel === 'columns' && (
        <div
          className={cn(
            'mun:w-52 mun:border-l mun:border-border mun:transition-all',
          )}
        >
          <div className="mun:space-y-3">
            <div className="mun:p-3 mun:flex mun:items-center mun:gap-3">
              <div className="mun:flex mun:items-center mun:gap-3">
                <Checkbox
                  checked={visibleColumns.every((col) => col.getIsVisible())}
                  onCheckedChange={(value) => {
                    visibleColumns.forEach((col) =>
                      col.toggleVisibility(Boolean(value)),
                    );
                  }}
                />
                <Badge className="mun:h-5 mun:min-w-5 mun:rounded-full mun:px-1.5 mun:font-mono mun:tabular-nums">
                  {table.getVisibleLeafColumns().length}
                </Badge>
              </div>
              <Input
                placeholder="Search columns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mun:max-h-50 mun:overflow-y-auto">
              <div className="mun:px-3 mun:py-1 mun:space-y-3">
                {visibleColumns.length > 0 ? (
                  visibleColumns.map((column) => (
                    <div key={column.id}>
                      <Label className="mun:capitalize">
                        <Checkbox
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => {
                            column.toggleVisibility(Boolean(value));
                          }}
                        />{' '}
                        <span className="truncate">
                          {column.id
                            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                            .replace(/^./, (str) => str.toUpperCase())}{' '}
                        </span>
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="mun:px-2 mun:py-4 mun:text-center mun:text-sm mun:text-muted-foreground">
                    No columns found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activePanel === 'filter' && (
        <div
          className={cn(
            'mun:w-52 mun:border-l mun:border-border mun:transition-all',
          )}
        >
          <div className="mun:space-y-3">
            <div className="mun:p-3">
              <DebouncedInput
                value={String(globalFilter)}
                onChange={(value) => {
                  if (setGlobalFilter) {
                    setGlobalFilter(String(value));
                  }
                }}
                placeholder="Search all columns..."
              />
            </div>
            <div className="mun:overflow-y-auto mun:h-[65vh] mun:px-3 mun:space-y-3">
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers
                    .filter(
                      (header) => !['rowNumber'].includes(header.column.id),
                    )
                    .map((header) => (
                      <ToolbarFilter key={header.id} column={header.column} />
                    ))}
                </React.Fragment>
              ))}
            </div>
            <Separator />
            <div className="mun:px-3">
              <Button
                onClick={() => table.setColumnFilters([])}
                variant="outline"
              >
                <ListRestart />
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      )}
      {activePanel === 'settings' && (
        <div
          className={cn(
            'mun:w-52 mun:border-l mun:border-border mun:transition-all',
          )}
        >
          <div className="mun:space-y-3">
            <div className="mun:p-3">
              <Button
                onClick={() => refetch?.()}
                disabled={isFetching}
                variant="outline"
                className="mun:w-full"
              >
                <RefreshCw className={cn(isFetching && 'mun:animate-spin')} />
                {isFetching ? 'Refreshing...' : 'Refresh Data'}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="mun:w-8 mun:border-l mun:border-border">
        {[
          { value: 'columns', label: 'Columns', icon: Columns },
          { value: 'filter', label: 'Filter', icon: Filter },
          { value: 'settings', label: 'Settings', icon: Settings },
        ].map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            variant="ghost"
            size="sm"
            className={cn(
              'mun:[writing-mode:vertical-rl] mun:rounded-none mun:h-auto mun:w-full mun:hover:bg-background! mun:cursor-pointer',
              activePanel === value && 'bg-background',
            )}
            onClick={() => togglePanel(value)}
          >
            <Icon />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
