import { Filter, ObjectId, Sort } from "mongodb";
import { blogsCollection } from "../../../db/collections";
import type { BlogUpdateDTO, CreateBlogDTO } from "../types/dto";
import { Blog, BlogWithMongoId } from "../types";
import { GetBlogsInputQuery } from "../types/input";

interface BlogRepository {
  createBlog: (blog: CreateBlogDTO) => Promise<BlogWithMongoId>;
  updateBlog: (id: string, blog: BlogUpdateDTO) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;
  deleteAllBlogs: () => Promise<boolean>;
}

export const blogRepository: BlogRepository = {
  createBlog: async (blog: CreateBlogDTO) => {
    const newBlog: Blog = {
      isMembership: false,
      createdAt: new Date().toISOString(),
      ...blog,
    };

    const result = await blogsCollection.insertOne(newBlog);

    return { ...newBlog, _id: result.insertedId };
  },

  updateBlog: async (id: string, blog: BlogUpdateDTO) => {
    const updateResult = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: blog },
    );

    return updateResult.matchedCount > 0;
  },

  deleteBlog: async (id: string) => {
    const deleteResult = await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return deleteResult.deletedCount > 0;
  },

  deleteAllBlogs: async () => {
    const deleteResult = await blogsCollection.deleteMany({});
    return deleteResult.deletedCount > 0;
  },
};
