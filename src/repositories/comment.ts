import { CommentRepository } from "../graphql/resolvers/post/types";
import { Comment } from "../entities";
import { Model } from "mongoose";
import DataLoader from 'dataloader'
import groupBy from 'lodash/groupBy'

export const makeCommentRepository = (commentDao: Model<Comment>): CommentRepository => {

    const batchComments = new DataLoader(async (keys: readonly string[]): Promise<Comment[][]> => {
        const comments = await commentDao.find({post: {$in: keys }});
        const commentMap = groupBy(comments, 'post')
        return keys.map((key: string) => commentMap[key] || [])
    });

    return  {
        async findAllByPostId(postId: string): Promise<Array<Comment>> {
            return batchComments.load(postId)
        },
        async createComment(postId: string, username: string, body: string): Promise<Comment> {
            const comment = new commentDao({ post: postId, body, username })
            await comment.save()
            return comment
        }
    }

};