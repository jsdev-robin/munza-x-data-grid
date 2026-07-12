'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useGrid } from '@/package/contexts/GridContext';

const ToolbarRows = () => {
  'use no memo';

  const { table, density } = useGrid();

  return (
    <div className="mun:flex mun:flex-col mun:gap-1.5 mun:h-full mun:py-1.5">
      <div className="mun:flex mun:items-center mun:justify-between mun:px-1.5 mun:pb-2.5 mun:border-b mun:border-border">
        <h1 className="mun:text-sm mun:font-bold">Rows</h1>
      </div>
      <div className="mun:space-y-2 mun:px-1.5 mun:flex-1">
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
      <div className="mun:px-1.5">
        <Button
          onClick={() => table.resetRowPinning()}
          variant="outline"
          size="xs"
        >
          Reset Row Pining
        </Button>
      </div>
    </div>
  );
};

export default ToolbarRows;
