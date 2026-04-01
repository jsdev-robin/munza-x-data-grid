'use client';

import React, { useRef } from 'react';
import useSyncScroll from '../../hooks/useSyncScroll';
import TBody from './TBody';
import THeader from './THeader';

const TMain = () => {
  const paneRef1 = useRef<HTMLDivElement>(null);
  const paneRef2 = useRef<HTMLDivElement>(null);

  useSyncScroll({
    refs: [paneRef1, paneRef2],
    axis: 'x',
  });

  return (
    <React.Fragment>
      <div
        className="mun:w-full mun:bg-muted mun:border-b mun:border-border mun:overflow-y-scroll mun:[scrollbar-color:transparent_transparent] mun:overflow-x-hidden"
        ref={paneRef1}
      >
        <THeader />
      </div>
      <div
        className="mun:h-[75vh] mun:w-full mun:overflow-scroll mun:bg-background"
        ref={paneRef2}
      >
        <TBody />
      </div>
    </React.Fragment>
  );
};

export default TMain;
