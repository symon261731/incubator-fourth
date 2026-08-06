import { Request, Response } from "express";
import { PostWithId } from "../../posts/types";
import { CreatePostDTO } from "../../posts/types/dto";
import { createPostSchema } from "../../posts/validation/schema";
import { formatError } from "../../../helpers/formatError";
import { ErrorResponse } from "../../../core";
import { blogsService } from "../applications/blogs.service";
import { mapMongoPostToResponse } from "../../posts/posts.mappers";

export async function createPostByBlogIdHandler(
  req: Request<{ blogId: string }, {}, Omit<CreatePostDTO, "blogId">>,
  res: Response<PostWithId | ErrorResponse | string>,
) {
  const { blogId } = req.params;

  const isBlogExists = await blogsService.getBlogById(blogId);
  if (!isBlogExists?._id) {
    res.status(404).send("not found blog id");
    return;
  }

  const dto: CreatePostDTO = {
    blogId,
    title: req.body.title,
    content: req.body.content,
    shortDescription: req.body.shortDescription,
  };

  const validateResult = createPostSchema.safeParse(dto);

  if (!validateResult.success) {
    res.status(400).json({
      errorsMessages: formatError(validateResult.error),
    });
    return;
  }

  const newPost = await blogsService.createPostByBlogId(validateResult.data);
  const result: PostWithId = mapMongoPostToResponse(newPost);

  res.status(201).send(result);
}
