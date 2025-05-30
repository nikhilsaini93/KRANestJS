import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Query, Post as PostMethod, Put, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './Interfaces/post.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    findAll(@Query("search") search?: string): Post[] {
        try {
            const extractAllPost = this.postsService.FindAll();

            if (search) {
                return extractAllPost.filter(post =>post.title.toLowerCase().includes(search.toLowerCase()))
            }else{
                return extractAllPost;
            }

        } catch (error) {
             throw new NotFoundException(

             )
        }
    }

    @Get(":id")
    findById(@Param("id"  , ParseIntPipe) id : number) : Post{
        return this.postsService.findById(id)

    }

    @PostMethod()
    @HttpCode(HttpStatus.CREATED)
  createPost(
    @Body() createPostData:Post
  ): Post {
    return this.postsService.createPost(createPostData);
  }

  @Put(":id")
  updatePost(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePostData: Partial<Post>,
  ): Post {
    return this.postsService.updatePost(id, updatePostData)
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  deletePost(@Param("id", ParseIntPipe) id: number): { message: string } {
     this.postsService.RemovePost(id);
      return { message: `Post with id ${id} removed successfully` };
  


}
}


 