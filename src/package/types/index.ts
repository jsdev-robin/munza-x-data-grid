import { type ColumnDef } from '@tanstack/react-table';
import type { ReactNode } from 'react';

export interface GridProps<T> {
  payload?: {
    data: T[];
    total: number;
  };
  columns: ColumnDef<T>[];
  children?: ReactNode;
  isToolbar?: boolean;
  name?: string;
}
