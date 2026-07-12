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

const MONGO_OPERATORS = [
  'eq',
  'ne',
  'gt',
  'gte',
  'lt',
  'lte',
  'in',
  'nin',
  'regex',
  'exists',
  'all',
  'size',
  'elemMatch',
  'type',
  'mod',
  'not',
  'and',
  'or',
  'nor',
  'text',
  'where',
  'geoWithin',
  'geoIntersects',
  'near',
  'nearSphere',
  'expr',
  'jsonSchema',
  'bitsAllClear',
  'bitsAllSet',
  'bitsAnyClear',
  'bitsAnySet',
  'rand',
];

function appendColumnFilter(
  params: URLSearchParams,
  filter: ColumnFilter,
): void {
  const { id, value } = filter;
  const dotNotation = id.replace(/_/g, '.');

  if (Array.isArray(value) && value.length === 2) {
    if (value[0] != null && value[0] !== '') {
      params.set(`${dotNotation}[gte]`, String(value[0]));
    }
    if (value[1] != null && value[1] !== '') {
      params.set(`${dotNotation}[lte]`, String(value[1]));
    }
    return;
  }

  if (typeof value === 'object' && value !== null) {
    Object.entries(value).forEach(([op, val]) => {
      if (MONGO_OPERATORS.includes(op) && val != null && val !== '') {
        params.set(`${dotNotation}[${op}]`, String(val));
      }
    });
    return;
  }

  if (value != null && value !== '') {
    params.set(dotNotation, String(value));
  }
}

export function URLSearch(queryArgs: QueryArgs): string {
  const params = new URLSearchParams();

  params.set('page', String(queryArgs.pagination.pageIndex + 1));
  params.set('limit', String(queryArgs.pagination.pageSize));

  queryArgs.columnFilters.forEach((filter) => {
    appendColumnFilter(params, filter);
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
