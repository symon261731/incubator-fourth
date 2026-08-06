import { Response, Request } from "express";
import { postsService } from "../applications/posts.service";
import { mapMongoPostToResponse } from "../posts.mappers";
import { PostWithId } from "../types";

export async function getPostByIdHandler(
  req: Request<{ id: string }>,
  res: Response<PostWithId | string>,
) {
  const post = await postsService.getPostById(req.params.id);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.status(200).send(mapMongoPostToResponse(post));
}
