'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  align = 'start',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          'mun:z-50 mun:max-h-(--radix-dropdown-menu-content-available-height) mun:w-(--radix-dropdown-menu-trigger-width) mun:min-w-32 mun:origin-(--radix-dropdown-menu-content-transform-origin) mun:overflow-x-hidden mun:overflow-y-auto mun:rounded-lg mun:bg-popover mun:p-1 mun:text-popover-foreground mun:shadow-md mun:ring-1 mun:ring-foreground/10 mun:duration-100 mun:data-[side=bottom]:slide-in-from-top-2 mun:data-[side=left]:slide-in-from-right-2 mun:data-[side=right]:slide-in-from-left-2 mun:data-[side=top]:slide-in-from-bottom-2 mun:data-[state=closed]:overflow-hidden mun:data-open:animate-in mun:data-open:fade-in-0 mun:data-open:zoom-in-95 mun:data-closed:animate-out mun:data-closed:fade-out-0 mun:data-closed:zoom-out-95',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "mun:group/dropdown-menu-item mun:relative mun:flex mun:cursor-default mun:items-center mun:gap-1.5 mun:rounded-md mun:px-1.5 mun:py-1 mun:text-sm mun:outline-hidden mun:select-none mun:focus:bg-accent mun:focus:text-accent-foreground mun:not-data-[variant=destructive]:focus:**:text-accent-foreground mun:data-inset:pl-7 mun:data-[variant=destructive]:text-destructive mun:data-[variant=destructive]:focus:bg-destructive/10 mun:data-[variant=destructive]:focus:text-destructive mun:dark:data-[variant=destructive]:focus:bg-destructive/20 mun:data-disabled:pointer-events-none mun:data-disabled:opacity-50 mun:[&_svg]:pointer-events-none mun:[&_svg]:shrink-0 mun:[&_svg:not([class*='size-'])]:size-4 mun:data-[variant=destructive]:*:[svg]:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "mun:relative mun:flex mun:cursor-default mun:items-center mun:gap-1.5 mun:rounded-md mun:py-1 mun:pr-8 mun:pl-1.5 mun:text-sm mun:outline-hidden mun:select-none mun:focus:bg-accent mun:focus:text-accent-foreground mun:focus:**:text-accent-foreground mun:data-inset:pl-7 mun:data-disabled:pointer-events-none mun:data-disabled:opacity-50 mun:[&_svg]:pointer-events-none mun:[&_svg]:shrink-0 mun:[&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span
        className="mun:pointer-events-none mun:absolute mun:right-2 mun:flex mun:items-center mun:justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "mun:relative mun:flex mun:cursor-default mun:items-center mun:gap-1.5 mun:rounded-md mun:py-1 mun:pr-8 mun:pl-1.5 mun:text-sm mun:outline-hidden mun:select-none mun:focus:bg-accent mun:focus:text-accent-foreground mun:focus:**:text-accent-foreground mun:data-inset:pl-7 mun:data-disabled:pointer-events-none mun:data-disabled:opacity-50 mun:[&_svg]:pointer-events-none mun:[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'mun:px-1.5 mun:py-1 mun:text-xs mun:font-medium mun:text-muted-foreground mun:data-inset:pl-7',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('mun:-mx-1 mun:my-1 mun:h-px mun:bg-border', className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'mun:ml-auto mun:text-xs mun:tracking-widest mun:text-muted-foreground mun:group-focus/dropdown-menu-item:text-accent-foreground',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "mun:flex mun:cursor-default mun:items-center mun:gap-1.5 mun:rounded-md mun:px-1.5 mun:py-1 mun:text-sm mun:outline-hidden mun:select-none mun:focus:bg-accent mun:focus:text-accent-foreground mun:not-data-[variant=destructive]:focus:**:text-accent-foreground mun:data-inset:pl-7 mun:data-open:bg-accent mun:data-open:text-accent-foreground mun:[&_svg]:pointer-events-none mun:[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        'mun:z-50 mun:min-w-24 mun:origin-(--radix-dropdown-menu-content-transform-origin) mun:overflow-hidden mun:rounded-lg mun:bg-popover mun:p-1 mun:text-popover-foreground mun:shadow-lg mun:ring-1 mun:ring-foreground/10 mun:duration-100 mun:data-[side=bottom]:slide-in-from-top-2 mun:data-[side=left]:slide-in-from-right-2 mun:data-[side=right]:slide-in-from-left-2 mun:data-[side=top]:slide-in-from-bottom-2 mun:data-open:animate-in mun:data-open:fade-in-0 mun:data-open:zoom-in-95 mun:data-closed:animate-out mun:data-closed:fade-out-0 mun:data-closed:zoom-out-95',
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
