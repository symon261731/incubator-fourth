import { BlogWithId, BlogWithMongoId } from "./types";

export function mapMongoBlogToResponse(blog: BlogWithMongoId): BlogWithId {
  const { _id, ...rest } = blog;

  return {
    ...rest,
    id: _id.toString(),
  };
}
