import { ApplicationContext, PostDto, Resolver } from '../types'
import { mapPost } from '../../mappers';
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

type CreateArgs = {
    title: string;
    body: string;
}

export const createPostResolver = (): Resolver<never, CreateArgs, ApplicationContext, never, PostDto> => {
    return async (_, {title, body}, { dataSources }): Promise<PostDto> => {
        const { postRepository } = dataSources;
        if (!title || !body) {
            throw new GraphQLError('Missing arguments', {
                extensions: {
                    code: ApolloServerErrorCode.BAD_USER_INPUT
                }
            })
        }
        const post = await postRepository.createPost(title, body);

        return mapPost(post);
    } 
}