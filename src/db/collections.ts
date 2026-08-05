import { Collection, Db } from "mongodb";
import { Post } from "../enteties/posts/types";
import { Blog } from "../enteties/blogs/types";

export const POSTS_COLLECTION_NAME = "posts";
export const BLOGS_COLLECTION_NAME = "blogs";

export let postsCollection: Collection<Post>;

export let blogsCollection: Collection<Blog>;

export const initCollections = async (db: Db) => {
  postsCollection = db.collection(POSTS_COLLECTION_NAME);
  blogsCollection = db.collection(BLOGS_COLLECTION_NAME);
};
