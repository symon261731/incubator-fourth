import { Blog } from ".";

export type CreateBlogDTO = Omit<Blog, "createdAt">;

export type BlogUpdateDTO = Omit<Blog, "id" | "createdAt" | 'isMembership'>;
