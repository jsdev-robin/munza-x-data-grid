/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { type HTMLProps, useEffect } from 'react';
import { cn } from '../../lib/utils';

const Checkbox = ({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      data-slot="checkbox"
      className={cn(
        'mun:border mun:border-input mun:rounded mun:disabled:opacity-50 mun:disabled:pointer-events-none mun:bg-background mun:focus:ring-offset-background mun:focus:ring-primary mun:checked:bg-primary mun:checked:border-primary mun:checked:dark:focus:ring-primary mun:checked:dark:border-primary mun:checked:dark:bg-primary',
        className,
      )}
      {...rest}
    />
  );
};

export { Checkbox };
