'use client';

import { Columns, Filter, Settings } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

const Toolbar = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

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
      {activePanel === 'toolbar' && (
        <div
          className={cn(
            'mun:w-52 mun:border-l mun:border-border mun:transition-all',
          )}
        >
          toolbar
        </div>
      )}
      {activePanel === 'filter' && (
        <div
          className={cn(
            'mun:w-52 mun:border-l mun:border-border mun:transition-all',
          )}
        >
          filter
        </div>
      )}
      <div className="mun:w-8 mun:border-l mun:border-border">
        {[
          { value: 'columns', label: 'Columns', icon: Columns },
          { value: 'toolbar', label: 'Toolbar', icon: Settings },
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
