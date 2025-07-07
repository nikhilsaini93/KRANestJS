import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserApiService } from './user.service';
import { CreateUserDto, currentUser, jwtAuthGuards, Role, Roles, UpdateUserDto, Userr } from '@app/common';
import { RolesGuard } from '@app/common/guards/role.guards';



@Controller('user')
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}

  @Post()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN )
  create(@Body() createUserApiDto: CreateUserDto , @currentUser() user : Userr) {
    console.log('Creating user with data:', createUserApiDto);
    console.log('Current user:', user );

  return this.userApiService.create(createUserApiDto , user);
  }

  @Get()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN )
  findAll() {
    return this.userApiService.findAll();
  }

  @Get(':id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN )
  findOne(@Param('id') id: string) {
    return this.userApiService.findOne(+id);
  }

  @Patch()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.SUPER_ADMIN )
  update(@Body() updateUserApiDto: UpdateUserDto) {
    return this.userApiService.update( updateUserApiDto);
  }

  @Delete(':id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.SUPER_ADMIN )
  remove(@Param('id') id: string) {
    return this.userApiService.remove(+id);
  }
}
