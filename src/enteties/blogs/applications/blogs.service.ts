import { BlogWithMongoId } from "../types";
import { blogRepository } from "../repositories/blogs.repository";
import { postsService } from "../../posts/applications/posts.service";
import { PostWithMongoId } from "../../posts/types";
import { PaginationParams } from "../../../core";
import { CreatePostDTO } from "../../posts/types/dto";
import { CreateBlogDTO } from "../types/dto";

interface BlogsService {
  createBlog: (data: CreateBlogDTO) => Promise<BlogWithMongoId>;
  deleteBlogById: (id: string) => Promise<boolean>;
  getPostsByBlogId: (
    blogId: string,
    params: PaginationParams,
  ) => Promise<PostWithMongoId[]>;
  createPostByBlogId: (data: CreatePostDTO) => Promise<PostWithMongoId>;
  updateBlogById: (id: string, data: CreateBlogDTO) => Promise<boolean>;
}

export const blogsService: BlogsService = {
  createBlog: async function (data: CreateBlogDTO) {
    const blog = await blogRepository.createBlog(data);
    return blog;
  },
  deleteBlogById: async function (id: string) {
    const result = await blogRepository.deleteBlog(id);
    return result;
  },
  updateBlogById: async function (id: string, data: CreateBlogDTO) {
    const result = await blogRepository.updateBlog(id, data);
    return result;
  },
  getPostsByBlogId: async function (blogId: string, params: PaginationParams) {
    const posts = await postsService.getPostsByBlogId(blogId, params);

    return posts;
  },
  createPostByBlogId: async function (data: CreatePostDTO) {
    const newPost = await postsService.createPost({ ...data });

    return newPost;
  },
};
