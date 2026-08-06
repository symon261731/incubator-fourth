import { Request, Response } from "express";
import { blogsService } from "../applications/blogs.service";

export async function deleteBlogByIdHandler(
  req: Request<{ id: string }>,
  res: Response<void | string>,
) {
  const result = await blogsService.deleteBlogById(req.params.id);
  console.log(`route delete blog/${req.params.id}`, result);
  if (!result) {
    res.status(404).send("Blog not found");
    return;
  }
  res.status(204).send();
}
