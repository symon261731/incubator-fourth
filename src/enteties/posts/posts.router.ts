import { Router } from "express";
import { authMiddleware } from "../../auth/middlewares";
import { getPostsHandler } from "./handlers/getPosts.handler";
import { getPostByIdHandler } from "./handlers/getPostById.handler";
import { deletePostHandler } from "./handlers/deletePost.handler";
import { createPostHandler } from "./handlers/createPost.handler";
import { updatePostHandler } from "./handlers/updatePost.handler";
import { paginationParamsMiddleware } from "../../core/middlewares/paginationParams.middleware";

const postsRouter = Router();

postsRouter
  .get("", paginationParamsMiddleware, getPostsHandler)
  .get("/:id", getPostByIdHandler)
  .post("", authMiddleware, createPostHandler)
  .put("/:id", authMiddleware, updatePostHandler)
  .delete("/:id", authMiddleware, deletePostHandler);

export default postsRouter;
