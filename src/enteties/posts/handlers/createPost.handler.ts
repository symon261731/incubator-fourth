import { Request, Response } from "express";
import { createPostSchema } from "../validation/schema";
import { formatError } from "../../../helpers/formatError";
import { postsService } from "../applications/posts.service";
import { mapMongoPostToResponse } from "../posts.mappers";

export async function createPostHandler(req: Request, res: Response) {
  const result = createPostSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      errorsMessages: formatError(result.error),
    });
    return;
  }

  const post = await postsService.createPost(result.data);

  console.log(`route create post`, post);
  res.status(201).send(mapMongoPostToResponse(post));
}
