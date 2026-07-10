'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Columns, Filter, Rows, Settings } from 'lucide-react';
import { useState } from 'react';
import ToolbarColumns from './ToolbarColumns';
import ToolbarRows from './ToolbarRows';

const Toolbar = ({ height }: { height: number }) => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div
      className="mun:bg-muted mun:overflow-hidden mun:hidden mun:sm:flex"
      style={{
        height: height,
      }}
    >
      {activePanel === 'columns' && (
        <div className="mun:w-52 mun:border-l mun:border-border mun:transition-all mun:h-full">
          <ToolbarColumns />
        </div>
      )}
      {activePanel === 'rows' && (
        <div className="mun:w-52 mun:border-l mun:border-border mun:transition-all mun:p-2">
          <ToolbarRows />
        </div>
      )}
      {activePanel === 'filter' && (
        <div className="mun:w-52 mun:border-l mun:border-border mun:transition-all mun:p-2">
          <ToolbarColumns />
        </div>
      )}
      {activePanel === 'settings' && (
        <div className="mun:w-52 mun:border-l mun:border-border mun:transition-all mun:p-2">
          <ToolbarColumns />
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
