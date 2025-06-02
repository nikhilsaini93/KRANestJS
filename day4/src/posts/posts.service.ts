import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './DTO/Posts.dto';
import { User } from 'src/auth1/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  // Get all posts
  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  // Get a post by ID
  async findById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  // Create a new post
async createPost(createPostDto: CreatePostDto, author: User): Promise<Post> {
  const newPost = this.postRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
      author,
      authorname: author.name,
    
    });

  return await this.postRepository.save(newPost);
}
  // Update a post
  async updatePost(id: number, updatePostData: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<Post> {
    const post = await this.findById(id);
    const updatedPost = this.postRepository.merge(post, updatePostData);
    updatedPost.updatedAt = new Date(); // manually updating timestamp if not using @UpdateDateColumn properly
    return await this.postRepository.save(updatedPost);
  }

  // Delete a post
  async removePost(id: number): Promise<{ message: string }> {
    const post = await this.findById(id);
    await this.postRepository.remove(post);
    return { message: `Post with id ${id} removed successfully` };
  }
}
