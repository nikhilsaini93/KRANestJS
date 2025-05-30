import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './Interfaces/post.interface';

@Injectable()
export class PostsService {
    private posts: Post[] = [
        {
            id: 1,
            title: "Understanding TypeScript Interfaces",
            content: "This post explores how to use interfaces in TypeScript to define object shapes.",
            authorname: "Alice Johnson",
            createdAt: new Date("2025-05-20T10:00:00Z"),
            updatedAt: new Date("2025-05-21T08:30:00Z"),
        },
        {
            id: 2,
            title: "Top 10 VSCode Extensions for Developers",
            content: "Here are the top 10 VSCode extensions to improve your productivity as a developer.",
            authorname: "Bob Smith",
            createdAt: new Date("2025-05-22T14:45:00Z"),
        },
        {
            id: 3,
            title: "A Guide to Responsive Web Design",
            content: "Learn how to make your websites look great on all devices using responsive design techniques.",
            authorname: "Carol Lee",
            createdAt: new Date("2025-05-23T09:15:00Z"),
            updatedAt: new Date("2025-05-24T11:00:00Z"),
        },
        {
            id: 4,
            title: "Introduction to Node.js Streams",
            content: "This post covers the basics of working with streams in Node.js for handling large data efficiently.",
            authorname: "David Kim",
            createdAt: new Date("2025-05-24T17:25:00Z"),
        },
        {
            id: 5,
            title: "How to Use Git Rebase Like a Pro",
            content: "Discover the power of Git rebase and how to use it effectively in your workflow.",
            authorname: "Emily Zhang",
            createdAt: new Date("2025-05-25T12:00:00Z"),
            updatedAt: new Date("2025-05-26T13:45:00Z"),
        },
    ]

    FindAll() {
        return this.posts;
    }

    findById(id: number): Post {
        const singlePost = this.posts.find(post => post.id == id)
        if (!singlePost) {
            throw new NotFoundException(`Post with id ${id} not found`)
        }
        return singlePost
    }

    createPost(createPostDatat: Omit<Post, "id" | "createdAt">): Post {

        const newPost: Post = {
            id: this.posts.length + 1,
            createdAt: new Date(),
            ...createPostDatat
        }
        this.posts.push(newPost)
        return newPost



    }
    updatePost(id: number, updatePostData: Partial<Omit<Post , "id" | "createdAt">>): Post {
        const postToUpdate = this.findById(id)
        if(!postToUpdate) throw new NotFoundException(`Post with id ${id} not found`)
        const updatedPost = { ...postToUpdate, ...updatePostData  ,
    updatedAt: new Date()}
        this.posts = this.posts.map(post => post.id === id ? updatedPost : post)
        return updatedPost
    }

    RemovePost(id: number) : {message : string}{
        const postToRemove = this.findById(id)
        if(!postToRemove) throw new NotFoundException(`Post with id ${id} not found`)
        this.posts = this.posts.filter(post => post.id !== id )  
    return {message : `Post with id ${id} removed successfully`}

    }






}
