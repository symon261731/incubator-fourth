import { CreatePostDTO, UpdatePostDTO } from "../types/dto";
import { Post, PostWithMongoId } from "../types";
import { postRepository } from "../posts.repository";
import { PaginationParams } from "../../../core";
import { blogsQueryRepository } from "../../blogs/repositories/blogsQuery.repository";

interface PostsService {
  getAllPosts: (params: PaginationParams) => Promise<PostWithMongoId[]>;
  getPostsByBlogId: (
    blogId: string,
    params: PaginationParams,
  ) => Promise<PostWithMongoId[]>;
  getPostById: (id: string) => Promise<PostWithMongoId | null>;
  createPost: (post: CreatePostDTO) => Promise<PostWithMongoId>;
  updatePost: (id: string, post: UpdatePostDTO) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
}

export const postsService: PostsService = {
  getAllPosts: async function (params: PaginationParams) {
    const posts = await postRepository.getAllPosts(params);
    return posts;
  },
  getPostsByBlogId: async function (blogId: string, params: PaginationParams) {
    const posts = await postRepository.getPostsByBlogId(blogId, params);
    return posts;
  },
  getPostById: async function (id: string) {
    const post = await postRepository.getPostById(id);
    return post;
  },
  createPost: async function (post: CreatePostDTO) {
    const blog = await blogsQueryRepository.getBlogById(post.blogId);

    const newPost: Post = {
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      createdAt: new Date().toISOString(),
      blogId: post.blogId,
      blogName: blog?.name || "",
    };

    const result = await postRepository.createPost(newPost);

    return result;
  },
  updatePost: async function (id: string, post: UpdatePostDTO) {
    const result = await postRepository.updatePost(id, post);
    return result;
  },
  deletePost: async function (id: string) {
    const result = await postRepository.deletePost(id);
    return result;
  },
};
