'use client';

import { useEffect, useRef } from 'react';

type Axis = 'x' | 'y' | 'both';

interface Props {
  refs: React.RefObject<HTMLElement | null>[];
  axis?: Axis;
}

const useSyncScroll = ({ refs, axis = 'both' }: Props) => {
  const scrollFrame = useRef<number | null>(null);
  const isSyncing = useRef(false);
  const listeners = useRef<Map<HTMLElement, EventListener>>(new Map());

  useEffect(() => {
    const elements = refs
      .map((ref) => ref.current)
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length < 2) return;

    const handleScroll = (source: HTMLElement) => {
      if (isSyncing.current) return;

      if (scrollFrame.current !== null)
        cancelAnimationFrame(scrollFrame.current);

      scrollFrame.current = requestAnimationFrame(() => {
        isSyncing.current = true;

        const scrollLeft = source.scrollLeft;
        const scrollTop = source.scrollTop;

        elements.forEach((el) => {
          if (el !== source) {
            if (
              (axis === 'x' || axis === 'both') &&
              el.scrollLeft !== scrollLeft
            )
              el.scrollLeft = scrollLeft;
            if ((axis === 'y' || axis === 'both') && el.scrollTop !== scrollTop)
              el.scrollTop = scrollTop;
          }
        });

        isSyncing.current = false;
      });
    };

    elements.forEach((el) => {
      const listener = () => handleScroll(el);
      listeners.current.set(el, listener);
      el.addEventListener('scroll', listener, { passive: true });
    });

    return () => {
      listeners.current.forEach((listener, el) =>
        el.removeEventListener('scroll', listener),
      );
      listeners.current.clear();
      if (scrollFrame.current !== null)
        cancelAnimationFrame(scrollFrame.current);
    };
  }, [refs, axis]);
};

export default useSyncScroll;
