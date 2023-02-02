import { mapComment } from "../../mappers";
import { ApplicationContext, CommentDto, Resolver } from "../types";
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

type CreateArgs = {
    post: string
    body: string
    username: string
};

export const createCommentResolver = (): Resolver<never, CreateArgs, ApplicationContext, never, CommentDto> => {
    return async (_, { post, body, username }, { dataSources }): Promise<CommentDto> => {
        const { commentRepository, postRepository } = dataSources
        const selectedPost = await postRepository.get(post)
        if (!selectedPost) {
            throw new GraphQLError('Could not find post', {
                extensions: {
                    code: ApolloServerErrorCode.BAD_USER_INPUT
                }})
        }
        if (!body || !username) {
            throw new GraphQLError('Missing fields', {
                extensions: {
                    code: ApolloServerErrorCode.BAD_USER_INPUT
                }})
        }
        const comment = await commentRepository.createComment(post, body, username)

        return mapComment(comment);
    };
};