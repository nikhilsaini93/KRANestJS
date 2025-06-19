
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface PostArgs {
    title: string;
    content: string;
    authorId?: Nullable<number>;
}

export interface UpdatePostInput {
    id: number;
    title?: Nullable<string>;
    content?: Nullable<string>;
    authorId?: Nullable<number>;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    description?: Nullable<string>;
}

export interface Post {
    post_id: number;
    title: string;
    content: string;
    authorId?: Nullable<number>;
}

export interface IQuery {
    books(): Book[] | Promise<Book[]>;
    posts(): Post[] | Promise<Post[]>;
    postByID(post_id: number): Post | Promise<Post>;
}

export interface IMutation {
    postByAuthor(postArgs: PostArgs): string | Promise<string>;
    updatePost(updatePostInput: UpdatePostInput): string | Promise<string>;
    deletePost(post_id: number): string | Promise<string>;
}

type Nullable<T> = T | null;
