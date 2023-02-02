export type Post = {
    _id:string;
    title: string;
    body: string;
    comments: Array<Comment>
}


export type Comment = {
    _id:string;
    body: string;
    username: string;
    post: Post
}