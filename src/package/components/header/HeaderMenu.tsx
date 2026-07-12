'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGrid } from '@/package/contexts/GridContext';
import { type Header } from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  EllipsisVertical,
  EyeOff,
  PinIcon,
  PinOff,
} from 'lucide-react';
import { useState } from 'react';

const HeaderMenu = <T,>({ header }: { header: Header<T, unknown> }) => {
  'use no memo';

  const [open, setOpen] = useState<boolean>(false);
  const { isLoading, isError } = useGrid();

  return header.column.getCanFilter() ? (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon-xs"
          variant={open ? 'outline' : 'ghost'}
          disabled={isLoading || isError}
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              header.column.toggleSorting(false);
              setOpen(false);
            }}
            disabled={!header.column.getCanSort()}
          >
            Sort ASC
            <DropdownMenuShortcut>
              <ArrowUp />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              header.column.toggleSorting(false);
              setOpen(false);
            }}
            disabled={!header.column.getCanSort()}
          >
            Sort DESC
            <DropdownMenuShortcut>
              <ArrowDown />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {!header.isPlaceholder && header.column.getCanPin() && (
          <DropdownMenuGroup>
            {header.column.getIsPinned() !== 'left' && (
              <DropdownMenuItem
                onClick={() => {
                  header.column.pin('left');
                }}
              >
                Pin to left
                <DropdownMenuShortcut>
                  <PinIcon className="mun:rotate-45" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
            {header.column.getIsPinned() && (
              <DropdownMenuItem
                onClick={() => {
                  header.column.pin(false);
                }}
              >
                Unpin
                <DropdownMenuShortcut>
                  <PinOff />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
            {header.column.getIsPinned() !== 'right' && (
              <DropdownMenuItem
                onClick={() => {
                  header.column.pin('right');
                }}
              >
                Pin to right
                <DropdownMenuShortcut>
                  <PinIcon className="mun:-rotate-45" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              header.column.toggleVisibility(false);
              setOpen(false);
            }}
            disabled={!header.column.getCanHide()}
          >
            Hide column
            <DropdownMenuShortcut>
              <EyeOff />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
};

export default HeaderMenu;
