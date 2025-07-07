import { CreateUserDto, UpdateUserDto, USER_SERVICE_NAME, Userr, UserServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserApiService implements OnModuleInit{
   private userService : UserServiceClient

   constructor(@Inject("USER_SERVICE") private client : ClientGrpc){}

   onModuleInit() {
     this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
   }
  create(createUserApiDto: CreateUserDto , user: Userr) {
  console.log('Creating user with data:', createUserApiDto);
  console.log('Current user:', user);
    return this.userService.createUser(createUserApiDto , user)
  
  }
  

 async  findAll() {
   return await this.userService.getAllUsers({})
  }

  async findOne(id: number) {
   return await firstValueFrom(this.userService.findUserById({id}))
  }

  update(updateUserApiDto: UpdateUserDto) {
    return firstValueFrom(this.userService.updateUser(updateUserApiDto))
  }

  remove(id: number) {
   return firstValueFrom(this.userService.deleteUser({id}))
  }
}
