import { useGrid } from '@/package/contexts/GridContext';
import TGetLeftBody from './TGetLeftBody';
import TGetLeftHeader from './TGetLeftHeader';

const TGetLeftMain = () => {
  const { isSplit } = useGrid();
  return (
    <>
      {isSplit ? (
        <div className="w-40">
          <TGetLeftHeader />
          <TGetLeftBody />
        </div>
      ) : null}
    </>
  );
};

export default TGetLeftMain;
