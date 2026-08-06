import { PostWithId, PostWithMongoId } from "./types";

export function mapMongoPostToResponse(post: PostWithMongoId): PostWithId {
  const { _id, ...otherProperties } = post;

  return {
    ...otherProperties,
    id: _id.toString(),
  };
}
