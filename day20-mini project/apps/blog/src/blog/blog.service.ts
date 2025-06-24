import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto, UpdatePostDto } from 'types/proto/blog';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService implements OnModuleInit {
  onModuleInit() {
    console.log('BlogService initialized');
  }

  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
  ) {}

  async createPost(createBlogDto: CreatePostDto) {
    const newBlog = this.blogRepository.create(createBlogDto);
    return this.blogRepository.save(newBlog);
  }

  async getAllPosts() {
    const posts = await this.blogRepository.find();
    return {posts};
  }

  async getPostById( id: number ) {
    const blog = await this.blogRepository.findOneBy({id })
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`)
    };
    return blog;
  }

  async updatePost(updateBlogDto: UpdatePostDto) {
    const blog = await this.blogRepository.preload(updateBlogDto);
    if (!blog) return null;
    return this.blogRepository.save(blog);
  }

  async deletePost(id : number ) {
    const post = await this.blogRepository.findOneBy({ id });
    if (!post) return false;
    await this.blogRepository.delete(id);
    return post;
  }
}
