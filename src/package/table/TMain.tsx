import React from 'react';
import { useGrid } from '../contexts/GridContext';
import TBody from './TBody';
import THeader from './THeader';

const TMain = () => {
  const { paneRef1, paneRef2 } = useGrid();

  return (
    <React.Fragment>
      <div
        className="mun:w-full mun:bg-muted mun:border-b mun:border-border mun:overflow-y-scroll mun:[scrollbar-color:transparent_transparent] mun:overflow-x-hidden"
        ref={paneRef1}
      >
        <THeader />
      </div>
      <div
        className="mun:w-full mun:overflow-scroll mun:bg-background"
        ref={paneRef2}
        style={{ height: '60vh' }}
      >
        <TBody />
      </div>
    </React.Fragment>
  );
};

export default TMain;
