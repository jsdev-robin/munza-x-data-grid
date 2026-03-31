import type { Column } from '@tanstack/react-table';
import { Loader } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const PREDEFINED_WIDTHS = [100, 60, 130, 80, 50, 70, 40, 120];

const TableRowSkeleton = ({
  column,
  i,
  j,
}: {
  column: Column<unknown, unknown>;
  i: number;
  j: number;
}) => {
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
