import { useGrid } from '@/package/contexts/GridContext';
import TGetLeftBody from './TGetLeftBody';
import TGetLeftHeader from './TGetLeftHeader';

const TGetLeftMain = () => {
  const { isSplit } = useGrid();
  return (
    <>
      {isSplit ? (
        <div>
          <TGetLeftHeader />
          <TGetLeftBody />
        </div>
      ) : null}
    </>
  );
};

export default TGetLeftMain;
