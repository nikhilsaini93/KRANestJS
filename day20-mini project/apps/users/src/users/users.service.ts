import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '@app/common/types/user';
import { UpdateUserDto, UpdateUserRoleDto } from 'types/proto/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findUserById(id : number ) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findUserByEmail({ email }: { email: string }) {
  const user = await this.userRepo.findOne({ where: { email } });
  return { user };
}

  async getAllUsers() {
    const users = await this.userRepo.find();
    return { users };
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.preload(updateUserDto);
    if (!user) throw new NotFoundException('User not found');
    return this.userRepo.save(user);
  }

  async updateUserRole(data: UpdateUserRoleDto) {
    const user = await this.userRepo.findOneBy({ id: data.id });
    if (!user) throw new NotFoundException('User not found');
    user.role = data.role;
    return this.userRepo.save(user);
  }

  async deleteUser(id : number ) {
    await this.userRepo.delete(id);
    return {};
  }
}