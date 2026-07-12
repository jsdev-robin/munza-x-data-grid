import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('mun:animate-pulse mun:rounded-md mun:bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
