'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGrid } from '@/package/contexts/GridContext';
import { Maximize, Minimize, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

const ToolbarSettings = () => {
  const { table, setIsSplit, gridWrapperRef, isFetching, refetch } = useGrid();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(document.fullscreenElement === gridWrapperRef.current);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, [gridWrapperRef]);

  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all settings to default?',
    );
    if (!confirmed) return;

    table.setColumnPinning({});
    table.resetRowPinning();
    table.setColumnVisibility({});
    table.setColumnOrder(table.getAllLeafColumns().map((c) => c.id));
    table.setColumnSizing({});
    table.setDensity('md');
    setIsSplit(false);

    window.alert('Settings have been reset to default.');
  };

  const handleToggleFullscreen = () => {
    if (!gridWrapperRef.current) return;

    if (!document.fullscreenElement) {
      gridWrapperRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="mun:flex mun:flex-col mun:gap-1.5 mun:h-full mun:py-1.5">
      <div className="mun:flex mun:items-center mun:justify-between mun:px-1.5 mun:pb-2.5 mun:border-b mun:border-border">
        <h1 className="mun:text-sm mun:font-bold">Settings</h1>
      </div>
      <div className="mun:px-1.5 mun:flex mun:flex-col mun:gap-2">
        <Button onClick={handleToggleFullscreen}>
          {isFullscreen ? (
            <>
              <Minimize className="mun:mr-2 mun:h-4 mun:w-4" />
              Exit Fullscreen
            </>
          ) : (
            <>
              <Maximize className="mun:mr-2 mun:h-4 mun:w-4" />
              Fullscreen
            </>
          )}
        </Button>

        <Button onClick={() => refetch?.()} disabled={isFetching}>
          <RefreshCw className={cn(isFetching && 'mun:animate-spin')} />
          {isFetching ? 'Refreshing...' : 'Refresh Data'}
        </Button>
        <Button onClick={handleReset}>Reset to Default</Button>
      </div>
    </div>
  );
};

export default ToolbarSettings;
