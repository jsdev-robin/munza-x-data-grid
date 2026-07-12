import { useGrid } from '@/package/contexts/GridContext';
import TGetRightBody from './TGetRightBody';
import TGetRightHeader from './TGetRightHeader';

const TGetRightMain = () => {
  const { isSplit, columnPinning, paneRef5, paneRef6, height } = useGrid();
  return (
    <>
      {isSplit && (columnPinning?.right?.length ?? 0) > 0 ? (
        <div className="mun:max-w-80 mun:overflow-hidden">
          <div
            className="mun:w-full mun:bg-muted mun:border-b mun:border-border mun:overflow-y-scroll mun:[scrollbar-color:transparent_transparent] mun:overflow-x-hidden"
            ref={paneRef5}
          >
            <TGetRightHeader />
          </div>
          <div
            className="mun:w-full mun:overflow-scroll mun:bg-background"
            ref={paneRef6}
            style={{ height: height }}
          >
            <TGetRightBody />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TGetRightMain;
