import { BlogWithId } from ".";
import { PaginationOutput } from "../../../core";

export interface GetBlogsOutput extends PaginationOutput {
  items: BlogWithId[];
}
