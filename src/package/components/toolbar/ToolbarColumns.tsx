'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useGrid } from '@/package/contexts/GridContext';

const ToolbarColumns = () => {
  const { table } = useGrid();

  return (
    <div className="mun:flex mun:flex-col mun:gap-2 mun:h-full mun:py-1.5">
      <div className="mun:flex mun:items-center mun:justify-between mun:px-2 mun:pb-1.5 mun:border-b mun:border-border">
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
      <div
        className="mun:space-y-2 mun:px-2 mun:flex-1 mun:overflow-y-auto mun:[&::-webkit-scrollbar]:w-2
  mun:[&::-webkit-scrollbar-track]:bg-stone-100
  mun:[&::-webkit-scrollbar-thumb]:bg-stone-300
  mun:dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  mun:dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
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
