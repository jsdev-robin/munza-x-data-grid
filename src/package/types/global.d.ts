import '@tanstack/react-table';
import { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?:
      | 'text'
      | 'number'
      | 'tel'
      | 'url'
      | 'color'
      | 'range'
      | 'select'
      | 'dateRange'
      | 'date'
      | 'datetime-local'
      | 'month'
      | 'time'
      | 'week';
  }
}
