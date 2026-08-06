import { PaginationParams } from "../../../core";


export interface GetBlogsInputQuery extends PaginationParams {
    searchNameTerm: string | null;
}