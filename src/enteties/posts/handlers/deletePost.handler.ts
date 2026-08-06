import { Response, Request } from "express";
import { postsService } from "../applications/posts.service";

export async function deletePostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  if (!req.params.id) {
    res.status(400).send("Post id is required");
    return;
  }

  const result = await postsService.deletePost(req.params.id);

  console.log(`route delete post/${req.params.id}`, result);
  if (!result) {
    res.status(404).send("Post not found");
    return;
  }

  res.status(204).send();
}
