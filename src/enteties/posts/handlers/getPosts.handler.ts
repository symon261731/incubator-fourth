import { Request, Response } from "express";
import { GetPostsOutput } from "../types/output";
import { postsService } from "../applications/posts.service";
import { mapMongoPostToResponse } from "../posts.mappers";
import { mapToPaginatedOutput } from "../../../helpers/paginateData";
import { PaginationParams } from "../../../core";

export async function getPostsHandler(
  req: Request<{}, {}, {}, PaginationParams>,
  res: Response<GetPostsOutput>,
) {
  const { pageNumber, pageSize, sortBy, sortDirection } = req.query;

  const posts = await postsService.getAllPosts({
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
  });

  const paginatedPosts = mapToPaginatedOutput(
    posts,
    {
      pageNumber: req.query.pageNumber,
      pageSize: req.query.pageSize,
      totalCount: posts.length,
    },
    mapMongoPostToResponse,
  );

  const result: GetPostsOutput = {
    items: paginatedPosts.data,
    ...paginatedPosts.meta,
  };
  
  console.log("posts list", result);

  res.status(200).send(result);
}
