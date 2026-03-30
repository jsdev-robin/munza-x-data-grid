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
        'border border-input rounded disabled:opacity-50 disabled:pointer-events-none bg-background focus:ring-offset-background focus:ring-primary checked:bg-primary checked:border-primary checked:dark:focus:ring-primary checked:dark:border-primary checked:dark:bg-primary',
        className,
      )}
      {...rest}
    />
  );
};

export { Checkbox };
