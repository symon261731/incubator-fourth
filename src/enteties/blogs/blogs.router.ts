import { Router } from "express";
import { paginationParamsMiddleware } from "../../core/middlewares/paginationParams.middleware";
import { authMiddleware } from "../../auth/middlewares";
import { getBlogsHandler } from "./handlers/getBlogs.handler";
import { getBlogByIdHandler } from "./handlers/getBlogById.handler";
import { deleteBlogByIdHandler } from "./handlers/deleteBlog.handler";
import { updateBlogHandler } from "./handlers/updateBlog.handler";
import { createBlogHandler } from "./handlers/createBlog.handler";
import { getPostsByBlogIdHandler } from "./handlers/getPostsByBlogId.handler";
import { createPostByBlogIdHandler } from "./handlers/createPostByBlogId.handler";

const blogsRouter = Router();

blogsRouter
  .get("/", paginationParamsMiddleware, getBlogsHandler)
  .get("/:id", getBlogByIdHandler)
  .post("", authMiddleware, createBlogHandler)
  .put("/:id", authMiddleware, updateBlogHandler)
  .delete("/:id", authMiddleware, deleteBlogByIdHandler)
  .get("/:blogId/posts", paginationParamsMiddleware, getPostsByBlogIdHandler)
  .post("/:blogId/posts", authMiddleware, createPostByBlogIdHandler);

export default blogsRouter;
