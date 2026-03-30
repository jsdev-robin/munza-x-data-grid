'use client';

import { Columns, Filter, ListRestart } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useGrid } from '../../hooks/useGrid';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import DebouncedInput from '../ui/debounced-input';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import ToolbarFilter from './ToolbarFilter';

const Toolbar = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };
  const { table, globalFilter, setGlobalFilter } = useGrid();

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
    <div className="bg-muted overflow-hidden hidden sm:flex">
      {activePanel === 'columns' && (
        <div className={cn('w-52 border-l border-border transition-all')}>
          <div className="space-y-3">
            <div className="p-3 flex items-center gap-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={visibleColumns.every((col) => col.getIsVisible())}
                  onChange={(e) => {
                    visibleColumns.forEach((col) =>
                      col.toggleVisibility(e.target.checked),
                    );
                  }}
                />
                <Badge className="h-5 min-w-5 rounded-full px-1.5 font-mono tabular-nums">
                  {table.getVisibleLeafColumns().length}
                </Badge>
              </div>
              <Input
                placeholder="Search columns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="max-h-50 overflow-y-auto">
              <div className="px-3 py-1 space-y-3">
                {visibleColumns.length > 0 ? (
                  visibleColumns.map((column) => (
                    <div key={column.id}>
                      <Label className="capitalize">
                        <Checkbox
                          {...{
                            type: 'checkbox',
                            checked: column.getIsVisible(),
                            onChange: column.getToggleVisibilityHandler(),
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
                  <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                    No columns found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activePanel === 'filter' && (
        <div className={cn('w-52 border-l border-border transition-all')}>
          <div className="space-y-3">
            <div className="p-3">
              <DebouncedInput
                value={globalFilter ?? ''}
                onChange={(value) => {
                  if (setGlobalFilter) {
                    setGlobalFilter(String(value));
                  }
                }}
                placeholder="Search all columns..."
              />
            </div>
            <div className="overflow-y-auto h-[65vh] px-3 space-y-3">
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
            <div className="px-3">
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
      <div className="w-8 border-l border-border">
        {[
          { value: 'columns', label: 'Columns', icon: Columns },
          { value: 'filter', label: 'Filter', icon: Filter },
        ].map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            variant="ghost"
            size="sm"
            className={cn(
              '[writing-mode:vertical-rl] rounded-none h-auto w-full hover:bg-background! cursor-pointer',
              activePanel === value && 'bg-background',
            )}
            onClick={() => togglePanel(value)}
          >
            <Icon className="size-4" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
