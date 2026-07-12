import { Skeleton } from '@/components/ui/skeleton';
import type { Column } from '@tanstack/react-table';
import { Loader } from 'lucide-react';

const PREDEFINED_WIDTHS = [60, 100, 80, 50, 70, 40, 90];

const TableRowSkeleton = ({
  column,
  i,
  j,
}: {
  column: Column<unknown, unknown>;
  i: number;
  j: number;
}) => {
  'use no memo';

  return (
    <>
      {['select'].includes(column.id) ? (
        <Loader size={16} className="animate-spin" />
      ) : ['actions', 'pin', 'drag-handle', 'rowNumber'].includes(column.id) ? (
        <Skeleton className="mun:w-full mun:h-4" />
      ) : (
        <Skeleton
          className="mun:h-4"
          style={{
            width: `${PREDEFINED_WIDTHS[(i + j) % PREDEFINED_WIDTHS.length]}px`,
          }}
        />
      )}
    </>
  );
};

export default TableRowSkeleton;
