import { useGrid } from '@/package/contexts/GridContext';
import TGetLeftBody from './TGetLeftBody';
import TGetLeftHeader from './TGetLeftHeader';

const TGetLeftMain = () => {
  const { isSplit, columnPinning } = useGrid();
  return (
    <>
      {isSplit && (columnPinning?.left?.length ?? 0) > 0 ? (
        <div className="mun:max-w-80 mun:overflow-hidden">
          <TGetLeftHeader />
          <TGetLeftBody />
        </div>
      ) : null}
    </>
  );
};

export default TGetLeftMain;
