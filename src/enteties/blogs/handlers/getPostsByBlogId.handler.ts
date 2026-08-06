import { Response, Request } from "express";
import { PaginationParams } from "../../../core";
import { GetPostsOutput } from "../../posts/types/output";
import { blogsService } from "../applications/blogs.service";
import { mapToPaginatedOutput } from "../../../helpers/paginateData";
import { mapMongoPostToResponse } from "../../posts/posts.mappers";

export async function getPostsByBlogIdHandler(
  req: Request<{ blogId: string }, {}, {}, PaginationParams>,
  res: Response<GetPostsOutput | string>,
) {
  const { blogId } = req.params;

  const isBlogExists = await blogsService.getBlogById(blogId);
  if (!isBlogExists?._id) {
    console.log("not found blog id");
    res.status(404).send("not found blog id");
  }

  const { pageNumber, pageSize, sortBy, sortDirection } = req.query;

  const posts = await blogsService.getPostsByBlogId(blogId, {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
  });

  const paginatedPosts = mapToPaginatedOutput(
    posts,
    {
      pageNumber,
      pageSize,
      totalCount: posts.length,
    },
    mapMongoPostToResponse,
  );

  const result: GetPostsOutput = {
    items: paginatedPosts.data,
    ...paginatedPosts.meta,
  };

  console.log(result);

  res.status(200).send(result);
}
