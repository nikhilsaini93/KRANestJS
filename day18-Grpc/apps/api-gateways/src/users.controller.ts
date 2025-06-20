// import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Post, Put } from '@nestjs/common';
// import { ClientGrpc } from '@nestjs/microservices';
// import { UserServiceGrpc } from "../../user-svc/src/user.interface"
// import { lastValueFrom } from 'rxjs';

// @Controller('users')
// // export class UserApiController implements OnModuleInit {
// export class UserApiController {
// //   private userService: UserServiceGrpc;

// //   constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

// //   onModuleInit() {
// //     this.userService = this.client.getService<UserServiceGrpc>('UserService');
// //   }

// //   @Post()
// //   async create(@Body() body) {
// //     return lastValueFrom(this.userService.CreateUser(body));
// //   }

// //   @Get()
// //   async findAll() {
// //     return lastValueFrom(this.userService.GetAllUsers({}));
// //   }

// //   @Get(':id')
// //   async findOne(@Param('id') id: number) {
// //     return lastValueFrom(this.userService.GetUser({ id: Number(id) }));
// //   }

// //   @Put(':id')
// //   async update(@Param('id') id: number, @Body() body) {
// //     return lastValueFrom(this.userService.UpdateUser({ id: Number(id), ...body }));
// //   }

// //   @Delete(':id')
// //   async delete(@Param('id') id: number) {
// //     return lastValueFrom(this.userService.DeleteUser({ id: Number(id) }));
// //   }
// }




