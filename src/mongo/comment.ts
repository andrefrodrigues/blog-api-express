import { Schema } from "mongoose";
import { Comment } from "../entities/types";

export const commentSchema = new Schema<Comment>({
    body: { type: String, required: true },
    username: { type: String, required: true },
    post: {type: Schema.Types.ObjectId, ref: 'Post'}
})