'use client';

import { Columns, Filter, ListRestart } from 'lucide-react';
import React, { useState } from 'react';
import { useGrid } from '../../hooks/useGrid';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import DebouncedInput from '../ui/debounced-input';
import { Separator } from '../ui/separator';
import ToolbarFilter from './ToolbarFilter';

const Toolbar = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };
  const { table } = useGrid();

  return (
    <div className="mun:bg-muted mun:overflow-hidden mun:hidden mun:sm:flex">
      {activePanel === 'columns' && (
        <div
          className={cn(
            'mun:w-52 mun:border-l mun:border-border mun:transition-all',
          )}
        >
          columns
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
                value="onn"
                onChange={() => {
                  console.log('ok');
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
      <div className="mun:w-8 mun:border-l mun:border-border">
        {[
          { value: 'columns', label: 'Columns', icon: Columns },
          { value: 'filter', label: 'Filter', icon: Filter },
        ].map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            variant="ghost"
            size="sm"
            className={cn(
              'mun:[writing-mode:vertical-rl] mun:rounded-none mun:h-auto mun:w-full mun:hover:bg-background! mun:cursor-pointer',
              activePanel === value && 'mun:bg-background',
            )}
            onClick={() => togglePanel(value)}
          >
            <Icon className="mun:size-4" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
