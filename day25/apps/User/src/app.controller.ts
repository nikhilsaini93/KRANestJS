import { Controller, UseGuards } from '@nestjs/common';

import { UpdateUserDto, UpdateUserRoleDto } from 'types/proto/user';
import { AppService } from './app.service';
import { CreateUserDto, currentUser, JwtAuthGuard, Role, Roles, Userr, UserServiceControllerMethods } from '@app/common';
import { RolesGuard } from '@app/common/guards/role.guards';


@Controller()
@UserServiceControllerMethods()
export class AppController {
  constructor(private readonly usersService: AppService) {
   
  }


  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
  // createUser( createUserDto: CreateUserDto , @currentUser() user : Userr) {
  //   return this.usersService.createUser(createUserDto , user);
  // }
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
createUser(req: { token: string; data: CreateUserDto }, @currentUser() user: Userr) {
  return this.usersService.createUser(req.data, user);
}


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // @UseGuards(jwtAuthGuards, RolesGuard)
  // @Roles(Role.ADMIN, Role.SUPER_ADMIN,)    
  findUserById(Proid: { id: number }) {
    return this.usersService.findUserById(Proid.id);
  }
  


   async findUserByEmail(data: { email: string }) {
    return this.usersService.findUserByEmail(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)  
  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser( updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  deleteUser(DeleteId: { id: number }) {
    return this.usersService.deleteUser(DeleteId.id);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  updateUserRole(data: UpdateUserRoleDto) {
    return this.usersService.updateUserRole(data);
  }
}
