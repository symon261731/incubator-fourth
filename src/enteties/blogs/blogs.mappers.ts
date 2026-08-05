import { BlogResponse, BlogWithId } from "./types";

export function mapMongoBlogToResponse(blog: BlogWithId): BlogResponse {
    const { _id, ...rest } = blog;

    return {
        ...rest,
        id: _id.toString(),
    }
}