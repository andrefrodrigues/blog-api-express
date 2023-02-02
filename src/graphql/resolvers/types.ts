import { Post, Comment } from "../../entities";
import { CommentRepository, PostRepository } from "./post/types";

type Arg<T> = T extends undefined ? undefined : T;

export type Resolver<P, A, C, I, T> = (parent: Arg<P>, args: Arg<A>, ctx: Arg<C>, info: I | undefined) => T | Promise<T>

type Dto = {
    id: string;
}
export type PostDto = Dto & Omit<Post, '_id' | 'comments'> & {
    comments: Array<CommentDto>
};

export type CommentDto = Dto & Omit<Comment, '_id' | 'post'>;

export type ApplicationContext = {
    dataSources: {
      postRepository: PostRepository;
      commentRepository: CommentRepository;
    }
  }