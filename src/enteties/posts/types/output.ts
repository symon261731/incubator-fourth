import { PostWithId } from ".";
import { PaginationOutput } from "../../../core";

export interface GetPostsOutput extends PaginationOutput {
  items: PostWithId[];
}

