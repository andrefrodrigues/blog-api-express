import { getAllPostsResolver } from './post/get-all-posts'
import { createPostResolver } from './post/create-post'
import { getCommentsByPostResolver } from './comments/get-comments-by-post'
import { IResolvers } from '@graphql-tools/utils'
import { createCommentResolver } from './comments/create-comment'

export const getResolvers = (): IResolvers => {
    return {
        Query: {
            posts: getAllPostsResolver(),
          },
        Post: {
            comments: getCommentsByPostResolver()
        },
        Mutation: {
            createPost: createPostResolver(),
            createComment: createCommentResolver()
        }
    }
}