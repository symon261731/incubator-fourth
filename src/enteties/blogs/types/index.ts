import { WithId } from "mongodb";

export interface Blog {
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership?: boolean;
}
export interface BlogResponse extends Blog {
  id: string;
}

export type BlogWithId = WithId<Blog>;
