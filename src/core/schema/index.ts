import * as z from "zod";

export const paginationParamsSchema = z.object({
  pageNumber: z.number().min(1).default(1),
  pageSize: z.number().min(1).default(10),
  sortBy: z.string().default("createdAt"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});
