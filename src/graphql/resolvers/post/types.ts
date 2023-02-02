import { Post, Comment } from "../../../entities";

export type PostRepository = {
    findAll: () => Promise<Array<Post>>;
    get: (id: string) => Promise<Post | null>;
    createPost: (title: string, body: string) => Promise<Post>;
}

export type CommentRepository = {
    findAllByPostId: (postId: string) => Promise<Array<Comment>>;
    createComment: (postId: string, body: string, username: string) => Promise<Comment>;
}