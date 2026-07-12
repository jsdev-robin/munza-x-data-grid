import { useGrid } from '@/package/contexts/GridContext';
import TGetLeftBody from './TGetLeftBody';
import TGetLeftHeader from './TGetLeftHeader';

const TGetLeftMain = () => {
  'use no memo';

  const { isSplit, columnPinning, paneRef3, paneRef4, height, isError } =
    useGrid();
  return (
    <>
      {!isError && isSplit && (columnPinning?.left?.length ?? 0) > 0 ? (
        <div className="mun:max-w-80 mun:overflow-hidden">
          <div
            className="mun:w-full mun:bg-muted mun:border-b mun:border-border mun:overflow-y-scroll mun:[scrollbar-color:transparent_transparent] mun:overflow-x-hidden"
            ref={paneRef3}
          >
            <TGetLeftHeader />
          </div>
          <div
            className="mun:w-full mun:overflow-scroll mun:bg-background"
            ref={paneRef4}
            style={{ height: height }}
          >
            <TGetLeftBody />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TGetLeftMain;
