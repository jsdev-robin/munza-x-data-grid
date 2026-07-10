'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useGrid } from '@/package/contexts/GridContext';

const ToolbarColumns = () => {
  const { table } = useGrid();

  return (
    <div className="mun:space-y-4">
      <div className="mun:flex mun:items-center mun:justify-between">
        <h1 className="mun:text-sm mun:font-bold">
          Columns({table.getAllLeafColumns().length})
        </h1>
        <Button
          size="xs"
          variant="ghost"
          onClick={() => table.resetColumnVisibility()}
        >
          Restore
        </Button>
      </div>
      <div className="mun:space-y-2">
        <Label>
          <Checkbox
            checked={table.getIsAllColumnsVisible()}
            onCheckedChange={table.getToggleAllColumnsVisibilityHandler()}
          />
          Toggle All
        </Label>
        {table.getAllLeafColumns().map((column) => (
          <Label key={column.id}>
            <Checkbox
              checked={column.getIsVisible()}
              onCheckedChange={(value) => {
                column.toggleVisibility(Boolean(value));
              }}
            />
            <span className="truncate">
              {column.id
                .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                .replace(/^./, (str) => str.toUpperCase())}{' '}
            </span>
          </Label>
        ))}
      </div>
    </div>
  );
};

export default ToolbarColumns;
