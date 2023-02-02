import { mapPost } from '../../mappers'
import { Resolver, PostDto } from '../types'
import { ApplicationContext } from '../types'

export const getAllPostsResolver = (): Resolver<never, never, ApplicationContext, never, Array<PostDto>> => {
    return async (_, __, { dataSources }): Promise<Array<PostDto>> => {
        const { postRepository } = dataSources;
        const posts = await postRepository.findAll();

        return posts.map(mapPost);
    }
}