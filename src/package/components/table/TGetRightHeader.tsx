import { Table, TableHeader, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import THead from './THead';

const TGetRightHeader = () => {
  'use no memo';

  const { table } = useGrid();
  return (
    <Table>
      <TableHeader className="sticky top-0 z-10 bg-muted">
        {table.getRightHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="mun:*:border-r mun:*:border-border"
          >
            {headerGroup.headers.map((header) => (
              <THead header={header} key={header.id} />
            ))}
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  );
};

export default TGetRightHeader;
