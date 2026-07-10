'use client';

import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'mun:peer mun:relative mun:flex mun:size-4 mun:shrink-0 mun:items-center mun:justify-center mun:rounded-[4px] mun:border mun:border-input mun:transition-colors mun:outline-none mun:group-has-disabled/field:opacity-50 mun:after:absolute mun:after:-inset-x-3 mun:after:-inset-y-2 mun:focus-visible:border-ring mun:focus-visible:ring-3 mun:focus-visible:ring-ring/50 mun:disabled:cursor-not-allowed mun:disabled:opacity-50 mun:aria-invalid:border-destructive mun:aria-invalid:ring-3 mun:aria-invalid:ring-destructive/20 mun:aria-invalid:aria-checked:border-primary mun:dark:bg-input/30 mun:dark:aria-invalid:border-destructive/50 mun:dark:aria-invalid:ring-destructive/40 mun:data-checked:border-primary mun:data-checked:bg-primary mun:data-checked:text-primary-foreground mun:dark:data-checked:bg-primary',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="mun:grid mun:place-content-center mun:text-current mun:transition-none mun:[&>svg]:size-3.5"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
