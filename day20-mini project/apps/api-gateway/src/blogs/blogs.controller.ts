import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreatePostDto, UpdatePostDto} from "@app/common/types/blog"
import { jwtAuthGuards } from '../auth-api/guards/auth.guards';
import { RolesGuard } from '../auth-api/guards/role.guards';
import { Role, Roles } from '../auth-api/decorators/roles.decorators';


@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.READER , Role.WRITER)
  create(@Body() createBlogDto: CreatePostDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  //   @UseGuards(jwtAuthGuards, RolesGuard)
  // @Roles(Role.ADMIN)
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateBlogDto: UpdatePostDto) {
    return this.blogsService.update(updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
