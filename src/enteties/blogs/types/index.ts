import { WithId } from "mongodb";
import { PaginationParams } from "../../../core";

export interface Blog {
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership?: boolean;
}
export interface BlogWithId extends Blog {
  id: string;
}

export type BlogWithMongoId = WithId<Blog>;
