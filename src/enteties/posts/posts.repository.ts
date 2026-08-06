import { Post, PostWithMongoId } from "./types";
import { UpdatePostDTO } from "./types/dto";
import { postsCollection } from "../../db/collections";
import { ObjectId, Sort } from "mongodb";
import { PaginationParams } from "../../core";

interface PostRepository {
  getAllPosts: (params: PaginationParams) => Promise<PostWithMongoId[]>;
  getPostsByBlogId: (
    blogId: string,
    params: PaginationParams,
  ) => Promise<PostWithMongoId[]>;
  createPost: (post: Post) => Promise<PostWithMongoId>;
  getPostById: (id: string) => Promise<PostWithMongoId | null>;
  updatePost: (id: string, post: UpdatePostDTO) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  deleteAllPosts: () => Promise<boolean>;
}

export const postRepository: PostRepository = {
  getAllPosts: async (params: PaginationParams) => {
    const sort: Sort = {
      [params.sortBy]: params.sortDirection === "asc" ? 1 : -1,
    };

    const result = await postsCollection.find().sort(sort).toArray();
    return result;
  },
  getPostsByBlogId: async (blogId, params) => {
    const posts = await postsCollection
      .find({ blogId })
      .sort({ [params.sortBy]: params.sortDirection === "asc" ? 1 : -1 });

    return posts.toArray();
  },

  createPost: async (post: Post) => {
    const result = await postsCollection.insertOne(post);

    return { ...post, _id: result.insertedId };
  },
  getPostById: async (id: string) => {
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    return post;
  },

  updatePost: async (id: string, post: UpdatePostDTO) => {
    const result = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: post },
    );

    return result.matchedCount > 0;
  },
  deletePost: async (id: string) => {
    const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount > 0;
  },
  deleteAllPosts: async () => {
    const result = await postsCollection.deleteMany({});
    return result.deletedCount === 0;
  },
};
