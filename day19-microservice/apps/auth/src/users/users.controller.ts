import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

import { UserServiceController, CreateUserDto , UpdateUserDto, UserServiceControllerMethods, Id, PaginationDto, User } from 'libs/common/src/types/auth';
import { Observable } from 'rxjs';


@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController{
  constructor(private readonly usersService: UsersService) {}


  createUser( createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  
  getAllUsers() {
    return this.usersService.findAll();
  }
  
  
  findUserById( findId: Id) {
    return this.usersService.findOne(findId.id);
  }


  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  
  deleteUser(deletId: Id) {
    return this.usersService.remove(deletId.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream);
   

  }
}
