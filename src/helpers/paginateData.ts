import { PaginationOutput, PaginationParams } from "../core";

export function mapToPaginatedOutput<TItem, TData>(
  items: TItem[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
  mapItem: (item: TItem) => TData,
): { meta: PaginationOutput; data: TData[] } {
  return {
    meta: {
      page: meta.pageNumber,
      pageSize: meta.pageSize,
      pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
      totalCount: meta.totalCount,
    },
    data: items
      .slice(
        (meta.pageNumber - 1) * meta.pageSize,
        meta.pageNumber * meta.pageSize,
      )
      .map(mapItem),
  };
}
