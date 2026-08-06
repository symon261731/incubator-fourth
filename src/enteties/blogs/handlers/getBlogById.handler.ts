import { Request, Response } from "express";
import { blogsQueryRepository } from "../repositories/blogsQuery.repository";
import { mapMongoBlogToResponse } from "../blogs.mappers";
import { BlogWithId } from "../types";

export async function getBlogByIdHandler(
  req: Request<{ id: string }>,
  res: Response<BlogWithId | string>,
) {
  const blog = await blogsQueryRepository.getBlogById(req.params.id);
  if (!blog) {
    res.status(404).send("Blog not found");
    return;
  }

  console.log(`route get post/${blog?._id}`, blog);
  res.status(200).send(mapMongoBlogToResponse(blog));
}
