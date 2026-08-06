import { Request, Response } from "express";
import { updatePostSchema } from "../validation/schema";
import { postsService } from "../applications/posts.service";
import { formatError } from "../../../helpers/formatError";

export async function updatePostHandler(req: Request, res: Response) {
  const id = req.params.id as string;

  const result = updatePostSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      errorsMessages: formatError(result.error),
    });
    return;
  }

  const isPostUpdated = await postsService.updatePost(id, result.data);

  if (!isPostUpdated) {
    res.status(404).send("Post not found");
    return;
  }

  res.status(204).send();
}
