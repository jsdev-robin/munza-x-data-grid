'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Columns, Filter, Rows, Settings } from 'lucide-react';
import { useState } from 'react';
import { useGrid } from '../contexts/GridContext';

const Toolbar = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };
  const { table, density } = useGrid();

  return (
    <div className="mun:bg-muted mun:overflow-hidden mun:hidden mun:sm:flex">
      {activePanel === 'columns' && (
        <div
          className={cn(
            'mun:w-52 mun:border-l mun:border-border mun:transition-all',
          )}
        >
          ddf
        </div>
      )}
      {activePanel === 'rows' && (
        <div
          className={cn(
            'mun:w-52 mun:border-l mun:border-border mun:transition-all',
          )}
        >
          <div className="mun:p-3">
            <Button onClick={() => table.toggleDensity()}>
              Toggle Density({density})
            </Button>
          </div>
        </div>
      )}

      {activePanel === 'filter' && (
        <div
          className={cn(
            'mun:w-52 mun:border-l mun:border-border mun:transition-all',
          )}
        >
          dfd
        </div>
      )}
      {activePanel === 'settings' && (
        <div
          className={cn(
            'mun:w-52 mun:border-l mun:border-border mun:transition-all',
          )}
        >
          dd
        </div>
      )}
      <div className="mun:w-7 mun:border-l mun:border-border">
        {[
          { value: 'columns', label: 'Columns', icon: Columns },
          { value: 'rows', label: 'Rows', icon: Rows },
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
