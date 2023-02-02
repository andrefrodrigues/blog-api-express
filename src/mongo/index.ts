import { postSchema } from "./post"
import { commentSchema } from "./comment"
import mongoose from 'mongoose'

export const PostDao = mongoose.model('Post', postSchema)
export const CommentDao = mongoose.model('Comment', commentSchema)