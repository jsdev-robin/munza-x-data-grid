import { Table, TableHeader, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/contexts/GridContext';
import THead from './THead';

const TGetLeftHeader = () => {
  const { table, paneRef3 } = useGrid();
  return (
    <div
      className="mun:w-full mun:bg-muted mun:border-b mun:border-border mun:overflow-y-scroll mun:[scrollbar-color:transparent_transparent] mun:overflow-x-hidden"
      ref={paneRef3}
    >
      <Table className="border-2 border-black">
        <TableHeader className="sticky top-0 z-10 bg-muted">
          {table.getLeftHeaderGroups().map((headerGroup) => (
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
    </div>
  );
};

export default TGetLeftHeader;
