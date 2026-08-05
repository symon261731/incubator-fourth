import { PostResponse, PostWithId } from "./types";

export function mapMongoPostToResponse(post: PostWithId): PostResponse {
  const { _id, ...otherProperties } = post;

  return {
    ...otherProperties,
    id: _id.toString(),
  };
}
