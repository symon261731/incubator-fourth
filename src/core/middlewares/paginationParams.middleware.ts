import { NextFunction, Request, Response } from "express";
import { paginationParamsSchema } from "../schema";
import { formatError } from "../../helpers/formatError";
import { PaginationParams } from "..";

export const paginationParamsMiddleware = (
  req: Request<{}, {}, {}, PaginationParams>,
  res: Response,
  next: NextFunction,
) => {
  const { pageNumber, pageSize, sortBy, sortDirection } = req.query;

  console.log(req.path, "queries", req.query);

  const result = paginationParamsSchema.safeParse({
    pageNumber: pageNumber ? Number(pageNumber) : 1,
    pageSize: pageSize ? Number(pageSize) : 10,
    sortBy: sortBy || "createdAt",
    sortDirection: sortDirection || "desc",
  });

  if (result.success) {
    // тут просто записываем в req.query результаты валидации и дефолтных значений для последующей обработке в handler
    Object.defineProperty(req, "query", {
      value: { ...req.query, ...result.data },
      writable: true,
      configurable: true,
      enumerable: true,
    });
    next();
    return;
  }

  res.status(400).send({ errorsMessages: formatError(result.error) });
};
