import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Database } from 'lucide-react';

const NoDataFoundMsg = () => {
  return (
    <div className="mun:absolute mun:left-1/2 mun:top-1/2 mun:-translate-x-1/2 mun:-translate-y-1/2 mun:hover:bg-transparent">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Database />
          </EmptyMedia>
          <EmptyTitle>No data</EmptyTitle>
          <EmptyDescription>No data found</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
};

export default NoDataFoundMsg;
