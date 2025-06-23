import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreateUserDto , UpdateUserDto, UserServiceClient ,USER_SERVICE_NAME, PaginationDto } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit{
  private usersService :UserServiceClient

  constructor(@Inject('AUTH_SERVICE') private client: ClientGrpc) {}
  onModuleInit() {
    this.usersService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  findAll() {
    return this.usersService.getAllUsers({});
  }

  findOne(id: number) {
    return this.usersService.findUserById({ id });
  }

  update(updateId: number, updateUserDto: UpdateUserDto) {
    const dto = { ...updateUserDto, id: updateId };
    return this.usersService.updateUser(dto);
}

  remove(id: number) {
    return this.usersService.deleteUser({ id });
  }

  emailUsers() {
    const users$ = new ReplaySubject<PaginationDto>();

    users$.next({ page: 0, skip: 25 });
    users$.next({ page: 1, skip: 25 });
    users$.next({ page: 2, skip: 25 });
    users$.next({ page: 3, skip: 25 });

    users$.complete();

    let chunkNumber = 1;

    this.usersService.queryUsers(users$).subscribe((users) => {
      console.log('Chunk', chunkNumber, users);
      chunkNumber += 1;
    });
  }
}
