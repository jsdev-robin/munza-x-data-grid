'use client';

import { Label as LabelPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'mun:flex mun:items-center mun:gap-2 mun:text-sm mun:leading-none mun:font-medium mun:select-none mun:group-data-[disabled=true]:pointer-events-none mun:group-data-[disabled=true]:opacity-50 mun:peer-disabled:cursor-not-allowed mun:peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
