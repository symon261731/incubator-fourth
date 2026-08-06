import { Request, Response } from "express";
import { updateBlogSchema } from "../validation/schema";
import { formatError } from "../../../helpers/formatError";
import { ErrorResponse } from "../../../core";
import { blogsService } from "../applications/blogs.service";

export async function updateBlogHandler(
  req: Request<{ id: string }>,
  res: Response<boolean | string | ErrorResponse>,
) {
  const id = req.params.id;

  if (!id) {
    res.status(400).send("id is required");
    return;
  }

  const validateResult = updateBlogSchema.safeParse(req.body);

  if (!validateResult.success) {
    res.status(400).json({
      errorsMessages: formatError(validateResult.error),
    });

    return;
  }

  const successUpdatedBlog = await blogsService.updateBlogById(
    id,
    validateResult.data,
  );
  if (!successUpdatedBlog) {
    res.status(404).send("not found");
    return;
  }

  console.log(`route update blog/${id}`, successUpdatedBlog);
  res.status(204).send();
}
