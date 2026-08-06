import { WithId } from "mongodb";

export interface Post {
  title: string;
  shortDescription: string;
  content: string;
  createdAt: string;
  blogId: string;
  blogName: string;
}

export interface PostWithId extends Post {
  id: string;
}

export type PostWithMongoId = WithId<Post>;
