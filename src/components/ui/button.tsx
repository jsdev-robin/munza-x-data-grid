import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "mun:group/button mun:inline-flex mun:shrink-0 mun:items-center mun:justify-center mun:rounded-lg mun:border mun:border-transparent mun:bg-clip-padding mun:text-sm mun:font-medium mun:whitespace-nowrap mun:transition-all mun:outline-none mun:select-none mun:focus-visible:border-ring mun:focus-visible:ring-3 mun:focus-visible:ring-ring/50 mun:active:translate-y-px mun:disabled:pointer-events-none mun:disabled:opacity-50 mun:aria-invalid:border-destructive mun:aria-invalid:ring-3 mun:aria-invalid:ring-destructive/20 mun:dark:aria-invalid:border-destructive/50 mun:dark:aria-invalid:ring-destructive/40 mun:[&_svg]:pointer-events-none mun:[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:mun:size-4",
  {
    variants: {
      variant: {
        default:
          'mun:bg-primary mun:text-primary-foreground mun:[a]:hover:mun:bg-primary/80',
        outline:
          'mun:border-border mun:bg-background mun:hover:mun:bg-muted mun:hover:mun:text-foreground mun:aria-expanded:mun:bg-muted mun:aria-expanded:mun:text-foreground mun:dark:border-input mun:dark:bg-input/30 mun:dark:hover:mun:bg-input/50',
        secondary:
          'mun:bg-secondary mun:text-secondary-foreground mun:hover:mun:bg-secondary/80 mun:aria-expanded:mun:bg-secondary mun:aria-expanded:mun:text-secondary-foreground',
        ghost:
          'mun:hover:mun:bg-muted mun:hover:mun:text-foreground mun:aria-expanded:mun:bg-muted mun:aria-expanded:mun:text-foreground mun:dark:hover:mun:bg-muted/50',
        destructive:
          'mun:bg-destructive/10 mun:text-destructive mun:hover:mun:bg-destructive/20 mun:focus-visible:mun:border-destructive/40 mun:focus-visible:mun:ring-destructive/20 mun:dark:mun:bg-destructive/20 mun:dark:hover:mun:bg-destructive/30 mun:dark:focus-visible:mun:ring-destructive/40',
        link: 'mun:text-primary mun:underline-offset-4 mun:hover:underline',
      },
      size: {
        default:
          'mun:h-8 mun:gap-1.5 mun:px-2.5 mun:has-data-[icon=inline-end]:mun:pr-2 mun:has-data-[icon=inline-start]:mun:pl-2',
        xs: "mun:h-6 mun:gap-1 mun:rounded-[min(var(--radius-md),10px)] mun:px-2 mun:text-xs mun:in-data-[slot=button-group]:mun:rounded-lg mun:has-data-[icon=inline-end]:mun:pr-1.5 mun:has-data-[icon=inline-start]:mun:pl-1.5 [&_svg:not([class*='size-'])]:mun:size-3",
        sm: "mun:h-7 mun:gap-1 mun:rounded-[min(var(--radius-md),12px)] mun:px-2.5 mun:text-[0.8rem] mun:in-data-[slot=button-group]:mun:rounded-lg mun:has-data-[icon=inline-end]:mun:pr-1.5 mun:has-data-[icon=inline-start]:mun:pl-1.5 [&_svg:not([class*='size-'])]:mun:size-3.5",
        lg: 'mun:h-9 mun:gap-1.5 mun:px-2.5 mun:has-data-[icon=inline-end]:mun:pr-3 mun:has-data-[icon=inline-start]:mun:pl-3',
        icon: 'mun:size-8',
        'icon-xs':
          "mun:size-6 mun:rounded-[min(var(--radius-md),10px)] mun:in-data-[slot=button-group]:mun:rounded-lg [&_svg:not([class*='size-'])]:mun:size-3",
        'icon-sm':
          'mun:size-7 mun:rounded-[min(var(--radius-md),12px)] mun:in-data-[slot=button-group]:mun:rounded-lg',
        'icon-lg': 'mun:size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
