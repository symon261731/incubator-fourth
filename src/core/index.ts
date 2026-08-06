export interface ErrorMessage {
  message: string;
  field: string;
}

export interface ErrorResponse {
  errorsMessages: ErrorMessage[];
}

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: "asc" | "desc";
}

export interface PaginationOutput {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
}
