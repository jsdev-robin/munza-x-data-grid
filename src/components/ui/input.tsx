import { cn } from '@/lib/utils';
import * as React from 'react';
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'mun:h-8 mun:w-full mun:min-w-0 mun:rounded-lg mun:border mun:border-input mun:bg-transparent mun:px-2.5 mun:py-1 mun:text-base mun:transition-colors mun:outline-none mun:file:inline-flex mun:file:h-6 mun:file:border-0 mun:file:bg-transparent mun:file:text-sm mun:file:font-medium mun:file:text-foreground mun:placeholder:text-muted-foreground mun:focus-visible:border-ring mun:focus-visible:ring-3 mun:focus-visible:ring-ring/50 mun:disabled:pointer-events-none mun:disabled:cursor-not-allowed mun:disabled:bg-input/50 mun:disabled:opacity-50 mun:aria-invalid:border-destructive mun:aria-invalid:ring-3 mun:aria-invalid:ring-destructive/20 mun:md:text-sm mun:dark:bg-input/30 mun:dark:disabled:bg-input/80 mun:dark:aria-invalid:border-destructive/50 mun:dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
}
export { Input };
