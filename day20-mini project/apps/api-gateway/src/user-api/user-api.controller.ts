import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { CreateUserDto, UpdateUserDto } from 'types/proto/user';
import { jwtAuthGuards } from '../auth-api/guards/auth.guards';
import { RolesGuard } from '../auth-api/guards/role.guards';
import { Role, Roles } from '../auth-api/decorators/roles.decorators';


@Controller('user')
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}

  @Post()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.READER , Role.WRITER)
  create(@Body() createUserApiDto: CreateUserDto) {
  return this.userApiService.create(createUserApiDto);
  }

  @Get()
  findAll() {
    return this.userApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userApiService.findOne(+id);
  }

  @Patch()
  update(@Body() updateUserApiDto: UpdateUserDto) {
    return this.userApiService.update( updateUserApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userApiService.remove(+id);
  }
}
