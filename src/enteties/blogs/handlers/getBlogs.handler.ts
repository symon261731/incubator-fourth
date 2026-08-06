import { Response, Request } from "express";
import { blogsService } from "../applications/blogs.service";
import { mapMongoBlogToResponse } from "../blogs.mappers";
import { GetBlogsInputQuery } from "../types/input";
import { mapToPaginatedOutput } from "../../../helpers/paginateData";
import { GetBlogsOutput } from "../types/output";

export async function getBlogsHandler(
  req: Request<{}, {}, {}, GetBlogsInputQuery>,
  res: Response<GetBlogsOutput>,
) {
  const paramsArgs: GetBlogsInputQuery = {
    searchNameTerm: req.query.searchNameTerm,
    pageNumber: req.query.pageNumber,
    pageSize: req.query.pageSize,
    sortBy: req.query.sortBy,
    sortDirection: req.query.sortDirection,
  };

  const blogs = await blogsService.getBlogs(paramsArgs);

  const paginatedBlogs = mapToPaginatedOutput(
    blogs,
    {
      pageNumber: paramsArgs.pageNumber,
      pageSize: paramsArgs.pageSize,
      totalCount: blogs.length,
    },
    mapMongoBlogToResponse,
  );

  console.log("route blogs/", paginatedBlogs);

  const result: GetBlogsOutput = {
    items: paginatedBlogs.data,
    ...paginatedBlogs.meta,
  };

  res.status(200).send(result);
}
