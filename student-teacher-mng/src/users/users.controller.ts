import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { currentUser } from 'src/auth/Decorators/currentUser.decorators';
import { User } from './entities/user.entity';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // @UseGuards(jwtAuthGuards)
  // create(@Body() createUserDto: CreateUserDto , @currentUser() currentUser : User) {
  //   return this.usersService.create(createUserDto , currentUser);
  // }
  @Post()
@UseGuards(jwtAuthGuards)
@UseInterceptors(FileInterceptor('profileImageUrl' , {
  storage: memoryStorage(),
}))
create(
  @Body() createUserDto: CreateUserDto,
  @currentUser() currentUser: User,
  @UploadedFile() file: Express.Multer.File,

) {
  return this.usersService.create(createUserDto, currentUser, file);
}


  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
