'use client';

import { Button } from '@/components/ui/button';
import { useGrid } from '@/package/contexts/GridContext';

const ToolbarRows = () => {
  const { table, density } = useGrid();

  return (
    <div className="mun:p-3">
      <Button onClick={() => table.toggleDensity()}>
        Toggle Density({density})
      </Button>
    </div>
  );
};

export default ToolbarRows;
