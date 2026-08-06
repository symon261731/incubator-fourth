import { ObjectId, Filter } from "mongodb";
import { blogsCollection } from "../../../db/collections";
import { Blog, BlogWithMongoId } from "../types";
import { GetBlogsInputQuery } from "../types/input";

interface Repository {
  getAllBlogs: (params: GetBlogsInputQuery) => Promise<BlogWithMongoId[]>;
  getBlogById: (id: string) => Promise<BlogWithMongoId | null>;
}

export const blogsQueryRepository: Repository = {
  getAllBlogs: async (params: GetBlogsInputQuery) => {
    const filter: Filter<Blog> = params.searchNameTerm
      ? { name: { $regex: params.searchNameTerm, $options: "i" } }
      : {};

    return blogsCollection
      .find(filter, {
        sort: { [params.sortBy]: params.sortDirection === "asc" ? 1 : -1 },
      })
      .toArray();
  },
  getBlogById: async (id: string) => {
    try {
      const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });

      return blog;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
