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
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:bg-transparent">
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
