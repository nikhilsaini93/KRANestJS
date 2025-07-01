import { CreateUserDto, Role, Userr } from '@app/common';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto, UpdateUserRoleDto } from 'types/proto/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Userr) private readonly userRepo: Repository<Userr>,
  ) {
    // Seed the super admin if no users exist
    // this.seedSuperAdmin();
  }

  async createUser(createUserDto: CreateUserDto , currentUser: Userr) { 


    const existingUser = await this.userRepo.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new NotFoundException('User already exists');
    }
    if(currentUser.role == Role.SUPER_ADMIN && createUserDto.role == Role.ADMIN) {
      return this.createUserWithRole(createUserDto, currentUser, Role.ADMIN);
   
    }

    //admin can not create super admin
    if(currentUser.role == Role.ADMIN && createUserDto.role == Role.SUPER_ADMIN) {
      throw new NotFoundException('Admin cannot create Super Admin');
    }

    //admin can create user
    if(currentUser.role == Role.ADMIN && createUserDto.role == Role.USER) {
      return this.createUserWithRole(createUserDto, currentUser, Role.USER);
    }

    //super admin can create user
    if(currentUser.role == Role.SUPER_ADMIN && createUserDto.role == Role.USER) {
      return this.createUserWithRole(createUserDto, currentUser, Role.USER);
    }

    //user can not create any user
    if(currentUser.role == Role.USER) {
      throw new NotFoundException('User cannot create any user');
    }

    throw new ForbiddenException(
      'You are not permitted to create this type of user.',
    );
    
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

  private async createUserWithRole(createUserDto: CreateUserDto, currentUser : Userr , role: Role) {
    const existingUser = await this.userRepo.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new NotFoundException('User already exists');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);
    const newUser = this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
      role: role,
    });

    return this.userRepo.save(newUser);

  }

 
  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  private async seedSuperAdmin() {
    const hashedPassword = await this.hashPassword('superadmin123');
    console.log('Seeding Super Admin with hashed password:', hashedPassword);
    const superAdmin = new Userr();
    superAdmin.name = 'Super Admin';
    superAdmin.email = 'superadmin@domain.com';
    superAdmin.password = hashedPassword;
    superAdmin.role = 'SUPER_ADMIN';

    await this.userRepo.save(superAdmin);
    console.log('Super Admin seeded');
  }
}