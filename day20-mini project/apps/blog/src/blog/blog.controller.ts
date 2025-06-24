import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BlogService } from './blog.service';
import { CreatePostDto , UpdatePostDto } from 'types/proto/blog';
import { BlogServiceControllerMethods } from '@app/common/types/blog';

@Controller()
@BlogServiceControllerMethods()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

 


  
  createPost(createBlogDto: CreatePostDto) {
    return this.blogService.createPost(createBlogDto);
  }

  getAllPosts() {
    return this.blogService.getAllPosts();
  }


  getPostById( Proid: { id: number }) {
    return this.blogService.getPostById(Proid.id);
  }

  
  updatePost(updateBlogDto: UpdatePostDto) {
    return this.blogService.updatePost(updateBlogDto);
  }

 
  deletePost(DeleteId: { id: number }) {
    return this.blogService.deletePost(DeleteId.id);
  }
}
