// import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Query, Post as PostMethod, Put, Delete, UseGuards } from '@nestjs/common';
// import { PostsService } from './posts.service';
// import { Post } from './Interfaces/post.interface';
// // import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


// @Controller('posts')
// // @UseGuards(JwtAuthGuard)
// export class PostsController {
//     constructor(private readonly postsService: PostsService) { }

//     @Get()
//     findAll(@Query("search") search?: string): Post[] {
//         try {
//             const extractAllPost = this.postsService.FindAll();

//             if (search) {
//                 return extractAllPost.filter(post =>post.title.toLowerCase().includes(search.toLowerCase()))
//             }else{
//                 return extractAllPost;
//             }

//         } catch (error) {
//              throw new NotFoundException(

//              )
//         }
//     }

//     @Get(":id")
//     findById(@Param("id"  , ParseIntPipe) id : number) : Post{
//         return this.postsService.findById(id)

//     }

//     @PostMethod()
//     @HttpCode(HttpStatus.CREATED)
//   createPost(
//     @Body() createPostData:Post
//   ): Post {
//     return this.postsService.createPost(createPostData);
//   }

//   @Put(":id")
//   updatePost(
//     @Param("id", ParseIntPipe) id: number,
//     @Body() updatePostData: Partial<Post>,
//   ): Post {
//     return this.postsService.updatePost(id, updatePostData)
//   }

//   @Delete(":id")
//   @HttpCode(HttpStatus.OK)
//   deletePost(@Param("id", ParseIntPipe) id: number): { message: string } {
//      this.postsService.RemovePost(id);
//       return { message: `Post with id ${id} removed successfully` };
  


// }
// }


 import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  Post as PostMethod,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './DTO/Posts.dto';
import { User, UserRole } from 'src/auth1/entities/user.entity';
import { currentUser } from 'src/auth1/decorators/currentuser.decorators';
import { jwtAuthGuards } from 'src/auth1/guards/authGuards';
import { RolesGuard } from 'src/auth1/guards/rolse.guards';
import { Roles } from 'src/auth1/decorators/roles.decorators';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
// @UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query('search') search?: string): Promise<Post[]> {
    const allPosts = await this.postsService.findAll();

    if (search) {
      return allPosts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return allPosts;
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Post> {
    return await this.postsService.findById(id);
  }

  @PostMethod()
  @UseGuards(jwtAuthGuards)
@HttpCode(HttpStatus.CREATED)
async createPost(
  @Body() createPostData: CreatePostDto,
  @currentUser() user: User,
) {
  return this.postsService.createPost(createPostData, user);
}

  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostData: Partial<Omit<Post, 'id' | 'createdAt'>>,
  ): Promise<Post> {
    return await this.postsService.updatePost(id, updatePostData);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(jwtAuthGuards , RolesGuard)
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.postsService.removePost(id);
  }
}
