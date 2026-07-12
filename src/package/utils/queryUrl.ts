interface ColumnFilter {
  id: string;
  value: unknown;
}

interface SortingItem {
  id: string;
  desc: boolean;
}

interface Pagination {
  pageIndex: number;
  pageSize: number;
}

interface QueryArgs {
  columnFilters: ColumnFilter[];
  globalFilter?: string;
  pagination: Pagination;
  sorting: SortingItem[];
  rowSelection?: Record<string, boolean>;
}

export function queryUrl(queryArgs: QueryArgs): string {
  const params = new URLSearchParams();

  params.set('page', String(queryArgs.pagination.pageIndex + 1));
  params.set('limit', String(queryArgs.pagination.pageSize));

  queryArgs.columnFilters.forEach((filter) => {
    if (
      filter.value !== undefined &&
      filter.value !== null &&
      filter.value !== ''
    ) {
      params.set(filter.id, String(filter.value));
    }
  });

  if (queryArgs.sorting.length > 0) {
    const sortValue = queryArgs.sorting
      .map((s) => (s.desc ? `-${s.id}` : s.id))
      .join(',');
    params.set('sort', sortValue);
  }

  if (queryArgs.globalFilter) {
    params.set('q', queryArgs.globalFilter);
  }

  return `?${params.toString()}`;
}
