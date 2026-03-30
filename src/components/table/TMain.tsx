import React from 'react';
import { useGrid } from '../../hooks/useGrid';
import TBody from './TBody';
import THeader from './THeader';

const TMain = () => {
  const { paneRef1, paneRef2 } = useGrid();

  return (
    <React.Fragment>
      <div
        className="w-full bg-muted border-b border-border overflow-y-scroll [scrollbar-color:transparent_transparent] overflow-x-hidden"
        ref={paneRef1}
      >
        <THeader />
      </div>
      <div
        className="h-[75vh] w-full overflow-scroll bg-background"
        ref={paneRef2}
      >
        <TBody />
      </div>
    </React.Fragment>
  );
};

export default TMain;
