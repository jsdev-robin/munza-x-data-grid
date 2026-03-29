import * as React from 'react';

import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';

type NativeSelectProps = Omit<React.ComponentProps<'select'>, 'size'> & {
  size?: 'sm' | 'default';
};

function NativeSelect({
  className,
  size = 'default',
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        'mun:group/native-select mun:relative mun:w-fit mun:has-[select:disabled]:opacity-50',
        className,
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="mun:h-8 mun:w-full mun:min-w-0 mun:appearance-none mun:rounded-lg mun:border mun:border-input mun:bg-transparent mun:py-1 mun:pr-8 mun:pl-2.5 mun:text-sm mun:transition-colors mun:outline-none mun:select-none mun:selection:bg-primary mun:selection:text-primary-foreground mun:placeholder:text-muted-foreground mun:focus-visible:border-ring mun:focus-visible:ring-3 mun:focus-visible:ring-ring/50 mun:disabled:pointer-events-none mun:disabled:cursor-not-allowed mun:aria-invalid:border-destructive mun:aria-invalid:ring-3 mun:aria-invalid:ring-destructive/20 mun:data-[size=sm]:h-7 mun:data-[size=sm]:rounded-[min(var(--radius-md),10px)] mun:data-[size=sm]:py-0.5 mun:dark:bg-accent mun:dark:aria-invalid:border-destructive/50 mun:dark:aria-invalid:ring-destructive/40"
        {...props}
      />
      <ChevronDownIcon
        className="mun:pointer-events-none mun:absolute mun:top-1/2 mun:right-2.5 mun:size-4 mun:-translate-y-1/2 mun:text-muted-foreground mun:select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption({ ...props }: React.ComponentProps<'option'>) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<'optgroup'>) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
