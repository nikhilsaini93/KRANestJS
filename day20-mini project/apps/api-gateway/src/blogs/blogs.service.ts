import { BLOG_SERVICE_NAME, BlogServiceClient, CreatePostDto } from '@app/common/types/blog';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UpdatePostDto } from 'types/proto/blog';

@Injectable()
export class BlogsService implements OnModuleInit {
  private blogsService: BlogServiceClient;

  constructor(@Inject("BLOG_SERVICE") private client: ClientGrpc) {}

  onModuleInit() {
    this.blogsService = this.client.getService<BlogServiceClient>(BLOG_SERVICE_NAME);
  }

  async create(createBlogDto: CreatePostDto) {
    return firstValueFrom(this.blogsService.createPost(createBlogDto));
  }

  async findAll() {
  return this.blogsService.getAllPosts({})
  }

  async findOne(id: number) {
    return await firstValueFrom(this.blogsService.getPostById({ id }));
  }

  async update(updateBlogDto: UpdatePostDto) {
    return firstValueFrom(this.blogsService.updatePost(updateBlogDto));
  }

  async remove(id: number) {
    return firstValueFrom(this.blogsService.deletePost({ id }));
  }
}
