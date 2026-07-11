'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useGrid } from '@/package/contexts/GridContext';

const ToolbarRows = () => {
  const { table, density } = useGrid();

  return (
    <div className="mun:flex mun:flex-col mun:gap-1.5 mun:h-full mun:p-1.5">
      <Label>Row Density</Label>
      <Button
        variant={density === 'sm' ? 'default' : 'outline'}
        onClick={() => table.setDensity('sm')}
        size="sm"
      >
        Small
      </Button>
      <Button
        variant={density === 'md' ? 'default' : 'outline'}
        onClick={() => table.setDensity('md')}
        size="sm"
      >
        Default
      </Button>
      <Button
        variant={density === 'lg' ? 'default' : 'outline'}
        onClick={() => table.setDensity('lg')}
        size="sm"
      >
        Large
      </Button>
    </div>
  );
};

export default ToolbarRows;
