import { Controller } from '@nestjs/common';

import { UserService } from './users.service';
import { CreateUserDto, UserServiceControllerMethods } from '@app/common/types/user';
import { UpdateUserDto, UpdateUserRoleDto } from 'types/proto/user';


@Controller()
@UserServiceControllerMethods()
export class UsersController {
  constructor(private readonly usersService: UserService) {
    
  }

  createUser( createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

 
  getAllUsers() {
    return this.usersService.getAllUsers();
  }


  findUserById(Proid: { id: number }) {
    return this.usersService.findUserById(Proid.id);
  }

   async findUserByEmail(data: { email: string }) {
    return this.usersService.findUserByEmail(data);
  }

  
  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser( updateUserDto);
  }

 
  deleteUser(DeleteId: { id: number }) {
    return this.usersService.deleteUser(DeleteId.id);
  }
  updateUserRole(data: UpdateUserRoleDto) {
    return this.usersService.updateUserRole(data);
  }
}
