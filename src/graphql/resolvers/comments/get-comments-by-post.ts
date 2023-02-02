import { ApplicationContext, CommentDto, PostDto, Resolver } from "../types";
import { mapComment } from "../../mappers";

export const getCommentsByPostResolver = (): Resolver<PostDto, never, ApplicationContext, never, Array<CommentDto>> => {
    return async (post: PostDto, __, { dataSources }): Promise<Array<CommentDto>> => {
        const { commentRepository } = dataSources;
        const comments = await commentRepository.findAllByPostId(post.id);
        return comments.map(mapComment)
    } 
}