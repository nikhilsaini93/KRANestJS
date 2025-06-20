import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/createuser.dto';
import { UpdateUserDto } from './DTO/updateuser.dto';

@Injectable()
export class AppService {
  private users: { id: number; name: string; email: string }[] = [];
  private id = 1;

  create(data: CreateUserDto) {
    const user = { id: this.id++, ...data };
    this.users.push(user);
    return user;
  }

  findOne(id: number) {
    return this.users.find(u => u.id === id);
  }

  findAll() {
    return { users: this.users };
  }

  update(data: UpdateUserDto) {
    const index = this.users.findIndex(u => u.id === data.id);
    if (index >= 0) {
      this.users[index] = data;
      return data;
    }
    return null;
  }

  delete(id: number) {
    this.users = this.users.filter(u => u.id !== id);
    return {};
  }
}
