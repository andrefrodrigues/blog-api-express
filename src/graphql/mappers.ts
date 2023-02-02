import { Comment, Post } from "../entities";
import { PostDto, CommentDto } from "./resolvers/types";

export const mapPost = ({_id, title, body }: Post): PostDto => {
    return { id: _id, title, body, comments: []};
}

export const mapComment = ({_id, body, username}: Comment): CommentDto => {
    return { id: _id, body, username }
}