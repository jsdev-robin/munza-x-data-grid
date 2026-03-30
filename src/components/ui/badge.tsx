/* eslint-disable react-refresh/only-export-components */
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'mun:group/badge mun:inline-flex mun:h-5 mun:w-fit mun:shrink-0 mun:items-center mun:justify-center mun:gap-1 mun:overflow-hidden mun:rounded-4xl mun:border mun:border-transparent mun:px-2 mun:py-0.5 mun:text-xs mun:font-medium mun:whitespace-nowrap mun:transition-all mun:focus-visible:border-ring mun:focus-visible:ring-[3px] mun:focus-visible:ring-ring/50 mun:has-data-[icon=inline-end]:pr-1.5 mun:has-data-[icon=inline-start]:pl-1.5 mun:aria-invalid:border-destructive mun:aria-invalid:ring-destructive/20 mun:dark:aria-invalid:ring-destructive/40 mun:[&>svg]:pointer-events-none mun:[&>svg]:size-3!',
  {
    variants: {
      variant: {
        default:
          'mun:bg-primary mun:text-primary-foreground mun:[a]:hover:bg-primary/80',
        secondary:
          'mun:bg-secondary mun:text-secondary-foreground mun:[a]:hover:bg-secondary/80',
        destructive:
          'mun:bg-destructive/10 mun:text-destructive mun:focus-visible:ring-destructive/20 mun:dark:bg-destructive/20 mun:dark:focus-visible:ring-destructive/40 mun:[a]:hover:bg-destructive/20',
        outline:
          'mun:border-border mun:text-foreground mun:[a]:hover:bg-muted mun:[a]:hover:text-muted-foreground',
        ghost:
          'mun:hover:bg-muted hover:text-muted-foreground mun:dark:hover:bg-muted/50',
        link: 'mun:text-primary mun:underline-offset-4 mun:hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
