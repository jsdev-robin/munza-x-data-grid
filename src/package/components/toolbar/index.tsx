'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Columns, Filter, GripVertical, Rows, Settings } from 'lucide-react';
import { useState } from 'react';
import ToolbarColumns from './ToolbarColumns';
import ToolbarDnd from './ToolbarDnd';
import ToolbarFilters from './ToolbarFilters';
import ToolbarRows from './ToolbarRows';
import ToolbarSettings from './ToolbarSettings';

const Toolbar = ({ height }: { height: number }) => {
  'use no memo';

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div
      className="mun:bg-muted mun:overflow-hidden mun:flex"
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
        <div className="mun:w-52 mun:border-l mun:border-border mun:transition-all mun:h-full">
          <ToolbarRows />
        </div>
      )}
      {activePanel === 'filter' && (
        <div className="mun:w-52 mun:border-l mun:border-border mun:transition-all mun:h-full">
          <ToolbarFilters />
        </div>
      )}
      {activePanel === 'dnd' && (
        <div className="mun:w-52 mun:border-l mun:border-border mun:transition-all mun:h-full">
          <ToolbarDnd />
        </div>
      )}
      {activePanel === 'settings' && (
        <div className="mun:w-52 mun:border-l mun:border-border mun:transition-all mun:h-full">
          <ToolbarSettings />
        </div>
      )}

      <div className="mun:w-7 mun:border-l mun:border-border">
        {[
          { value: 'columns', label: 'Columns', icon: Columns },
          { value: 'rows', label: 'Rows', icon: Rows },
          { value: 'filter', label: 'Filter', icon: Filter },
          { value: 'dnd', label: 'Dnd', icon: GripVertical },
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
