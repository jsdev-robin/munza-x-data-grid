import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        'mun:flex mun:w-full mun:min-w-0 mun:flex-1 mun:flex-col mun:items-center mun:justify-center mun:gap-4 mun:rounded-xl mun:border-dashed mun:p-6 mun:text-center mun:text-balance',
        className,
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        'mun:flex mun:max-w-sm mun:flex-col mun:items-center mun:gap-2',
        className,
      )}
      {...props}
    />
  );
}

const emptyMediaVariants = cva(
  'mun:mb-2 mun:flex mun:shrink-0 mun:items-center mun:justify-center mun:[&_svg]:pointer-events-none mun:[&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "mun:flex mun:size-8 mun:shrink-0 mun:items-center mun:justify-center mun:rounded-lg mun:bg-muted mun:text-foreground mun:[&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function EmptyMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        'mun:font-heading mun:text-sm mun:font-medium mun:tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        'mun:text-sm/relaxed mun:text-muted-foreground mun:[&>a]:underline mun:[&>a]:underline-offset-4 mun:[&>a:hover]:text-primary',
        className,
      )}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        'mun:flex mun:w-full mun:max-w-sm mun:min-w-0 mun:flex-col mun:items-center mun:gap-2.5 mun:text-sm mun:text-balance',
        className,
      )}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
};
