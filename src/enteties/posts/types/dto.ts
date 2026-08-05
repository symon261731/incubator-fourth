import { Post } from ".";


export type CreatePostDTO = Omit<Post, "createdAt" | "blogName">;

export interface UpdatePostDTO {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}


