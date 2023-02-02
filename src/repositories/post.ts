import { Post } from '../entities/types'
import { PostRepository } from '../graphql/resolvers/post/types';
import { Model } from 'mongoose';

export const makePostRepository = (postDao: Model<Post>): PostRepository => {
    return {
        async findAll(): Promise<Array<Post>> {
            return await postDao.find()
        },
        
        async createPost(title: string, body: string): Promise<Post> {
            const post = new postDao({ title, body })
            await post.save()
            return post
        },
        async get(id: string): Promise<Post | null> {
            return postDao.findById(id);
        }
    }
};