import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserDto } from './DTO/createuser.dto';
import { UpdateUserDto } from './DTO/updateuser.dto';

@Controller("user")
export class AppController {
   constructor(private readonly userService: AppService) {}

  @GrpcMethod('UserService', 'CreateUser')
  create(data: CreateUserDto) {
    return this.userService.create(data);
  }

  @GrpcMethod('UserService', 'GetUser')
  findOne({ id }: { id: number }) {
    return this.userService.findOne(id);
  }

  @GrpcMethod('UserService', 'GetAllUsers')
  findAll() {
    return this.userService.findAll();
  }

  @GrpcMethod('UserService', 'UpdateUser')
  update(data: UpdateUserDto) {
    return this.userService.update(data);
  }

  @GrpcMethod('UserService', 'DeleteUser')
  delete({ id }: { id: number }) {
    return this.userService.delete(id);
  }
}
