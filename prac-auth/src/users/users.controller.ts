import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { Throttle } from '@nestjs/throttler';
import { CreateUserDto } from './DTO/createuser.dto';
import { currentUser } from 'src/auth/Decorators/currentUser.decorators';
import { User, UserRole } from './entities/user.entity';
import { Roles } from 'src/auth/Decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guards/role.guards';

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}


@Get()
@Throttle({ default: { limit: 3, ttl: 60000 } })
@UseGuards(jwtAuthGuards)
findall() {
  return this.userService.findAll();
}


@Post()
@UseGuards(jwtAuthGuards)
createUser(@Body() createUserDto: CreateUserDto ,@currentUser() currentUser: User) {
  //('Creating user with DTO in controller:', createUserDto, 'by current user:', currentUser);
  return this.userService.createUser(createUserDto, currentUser);
}

@Get("check/:id")
@UseGuards(jwtAuthGuards , RolesGuard)
@Roles(UserRole.ADMIN)
tocheck(@Param('id') id: number) {
  return this.userService.toCheckSecretMsg(+id);


}
}