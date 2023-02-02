import { Schema } from 'mongoose';
import { Post } from '../entities/types';


export const postSchema = new Schema<Post>({
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})