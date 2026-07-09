/**
 * queryBuilder.ts
 *
 * Converts TanStack Table's client-side state (column filters, global filter,
 * sorting, pagination) into a Mongoose/MongoDB-friendly query descriptor.
 *
 * Usage:
 *   const query = buildMongooseQuery({
 *     columnFilters,
 *     globalFilter,
 *     sorting,
 *     pagination,
 *     searchableFields: ["name", "email"],
 *   });
 *
 *   // On the server:
 *   const docs = await Model.find(query.filter)
 *     .sort(query.sort)
 *     .skip(query.skip)
 *     .limit(query.limit);
 *
 *   const total = await Model.countDocuments(query.filter);
 */

// ---------------------------------------------------------------------------
// Minimal local types mirroring @tanstack/react-table's state shapes.
// If you already import these from @tanstack/react-table, you can drop these
// and import { ColumnFiltersState, SortingState } from "@tanstack/react-table" instead.
// ---------------------------------------------------------------------------

export interface ColumnFilter {
  id: string;
  value: unknown;
}

export type ColumnFiltersState = ColumnFilter[];

export interface SortingRule {
  id: string;
  desc: boolean;
}

export type SortingState = SortingRule[];

export interface PaginationState {
  pageIndex: number; // 0-based, like TanStack Table
  pageSize: number;
}

// ---------------------------------------------------------------------------
// Per-column filter behavior configuration
// ---------------------------------------------------------------------------

export type FilterVariant =
  | 'text' // substring match -> $regex
  | 'exact' // exact match
  | 'range' // [min, max] -> $gte / $lte
  | 'dateRange' // [startDate, endDate] -> $gte / $lte
  | 'select' // exact match on a single option
  | 'multiSelect' // array of options -> $in
  | 'boolean'; // true/false -> exact match

export interface ColumnFilterConfig {
  /** How this column's filter value should be interpreted. Defaults to "text". */
  variant?: FilterVariant;
  /**
   * Override the field name used in the Mongo query if it differs from the
   * column id (e.g. column id "authorName" -> field "author.name").
   */
  field?: string;
  /** Case-insensitive regex for "text" variant. Defaults to true. */
  caseInsensitive?: boolean;
}

export interface QueryBuilderOptions {
  columnFilters?: ColumnFiltersState;
  globalFilter?: string;
  sorting?: SortingState;
  pagination?: PaginationState;
  /**
   * Per-column-id configuration controlling how each filter value is
   * translated into a Mongo operator. Columns not listed here default to
   * variant: "text".
   */
  columnConfig?: Record<string, ColumnFilterConfig>;
  /**
   * Fields to search when `globalFilter` is set. Produces an $or of
   * case-insensitive regex matches across these fields.
   */
  searchableFields?: string[];
  /** Map a sort column id to a different Mongo field name if needed. */
  sortFieldMap?: Record<string, string>;
}

export interface MongooseQuery {
  filter: Record<string, any>;
  sort: Record<string, 1 | -1>;
  skip: number;
  limit: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isEmptyValue(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
}

function buildFieldClause(
  value: unknown,
  config: ColumnFilterConfig,
): Record<string, any> | undefined {
  const variant = config.variant ?? 'text';

  switch (variant) {
    case 'text': {
      if (typeof value !== 'string' || value.trim() === '') return undefined;
      const flags = config.caseInsensitive === false ? '' : 'i';
      return { $regex: escapeRegex(value.trim()), $options: flags };
    }

    case 'exact':
    case 'select':
    case 'boolean': {
      return value as any;
    }

    case 'multiSelect': {
      if (!Array.isArray(value) || value.length === 0) return undefined;
      return { $in: value };
    }

    case 'range': {
      if (!Array.isArray(value)) return undefined;
      const [min, max] = value;
      const clause: Record<string, any> = {};
      if (min !== undefined && min !== null && min !== '') clause.$gte = min;
      if (max !== undefined && max !== null && max !== '') clause.$lte = max;
      return Object.keys(clause).length ? clause : undefined;
    }

    case 'dateRange': {
      if (!Array.isArray(value)) return undefined;
      const [start, end] = value;
      const clause: Record<string, any> = {};
      if (start) clause.$gte = new Date(start);
      if (end) clause.$lte = new Date(end);
      return Object.keys(clause).length ? clause : undefined;
    }

    default:
      return undefined;
  }
}

// ---------------------------------------------------------------------------
// Main builder
// ---------------------------------------------------------------------------

export function buildMongooseQuery(
  options: QueryBuilderOptions,
): MongooseQuery {
  const {
    columnFilters = [],
    globalFilter,
    sorting = [],
    pagination,
    columnConfig = {},
    searchableFields = [],
    sortFieldMap = {},
  } = options;

  const andClauses: Record<string, any>[] = [];

  // --- Column filters ---
  for (const { id, value } of columnFilters) {
    if (isEmptyValue(value)) continue;

    const config = columnConfig[id] ?? {};
    const field = config.field ?? id;
    const clause = buildFieldClause(value, config);

    if (clause !== undefined) {
      andClauses.push({ [field]: clause });
    }
  }

  // --- Global (free-text) filter across multiple fields ---
  if (
    globalFilter &&
    globalFilter.trim() !== '' &&
    searchableFields.length > 0
  ) {
    const regex = { $regex: escapeRegex(globalFilter.trim()), $options: 'i' };
    andClauses.push({
      $or: searchableFields.map((field) => ({ [field]: regex })),
    });
  }

  const filter: Record<string, any> =
    andClauses.length === 0
      ? {}
      : andClauses.length === 1
        ? andClauses[0]
        : { $and: andClauses };

  // --- Sorting ---
  const sort: Record<string, 1 | -1> = {};
  for (const { id, desc } of sorting) {
    const field = sortFieldMap[id] ?? id;
    sort[field] = desc ? -1 : 1;
  }

  // --- Pagination ---
  const pageIndex = pagination?.pageIndex ?? 0;
  const pageSize = pagination?.pageSize ?? 10;

  return {
    filter,
    sort,
    skip: pageIndex * pageSize,
    limit: pageSize,
  };
}

export default buildMongooseQuery;
