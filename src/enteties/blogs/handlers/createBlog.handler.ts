import { Response, Request } from "express";
import { BlogWithId } from "../types";
import { CreateBlogDTO } from "../types/dto";
import { ErrorResponse } from "../../../core";
import { createBlogSchema } from "../validation/schema";
import { formatError } from "../../../helpers/formatError";
import { blogsService } from "../applications/blogs.service";
import { mapMongoBlogToResponse } from "../blogs.mappers";

export async function createBlogHandler(
  req: Request<{}, {}, CreateBlogDTO>,
  res: Response<BlogWithId | ErrorResponse>,
) {
  const result = createBlogSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      errorsMessages: formatError(result.error),
    });
    return;
  }

  const blog = await blogsService.createBlog(result.data);
  console.log(`route create post`, blog);
  res.status(201).send(mapMongoBlogToResponse(blog));
}
