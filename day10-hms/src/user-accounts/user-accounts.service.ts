import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserAccounts } from './enitity/user-account.entity';
import { Repository } from 'typeorm';
import { CreateUserAccountDto } from './DTO/user-account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectRepository(UserAccounts)
    private readonly userAccountsRepository: Repository<UserAccounts>,
  ) {}

  async findall() {
    return await this.userAccountsRepository
      .find
      //     relations :{
      //         staff : true
      //     }
      // });
      ();
  }
  async findOne(id: number) {
    return await this.userAccountsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        staff: true,
      },
    });
  }

  async createUser(
    createUserAccountDto: CreateUserAccountDto,
    currentUser: UserAccounts,
  ) {
    // admin can create manager
    if (
      currentUser.role === Role.ADMIN &&
      createUserAccountDto.role === Role.MANAGER
    ) {
      return this.createUserWithRole(
        createUserAccountDto,
        currentUser,
        Role.MANAGER,
      );
    }
    // manager cannot create admin
    if (
      currentUser.role === Role.MANAGER &&
      createUserAccountDto.role === Role.ADMIN
    ) {
      throw new ForbiddenException(
        'Managers are not allowed to create Admins.',
      );
    }

    // admin creates staff
    if (
      currentUser.role === Role.ADMIN &&
      createUserAccountDto.role === Role.STAFF
    ) {
      return this.createUserWithRole(
        createUserAccountDto,
        currentUser,
        Role.STAFF,
      );
    }

    // staff cannot create managerr
    if (
      currentUser.role === Role.STAFF &&
      createUserAccountDto.role === Role.MANAGER
    ) {
      throw new ForbiddenException(
        'Staffs are not allowed to create Managers.',
      );
    }

    // staff cannot create admin
    if (
      currentUser.role === Role.STAFF &&
      createUserAccountDto.role === Role.ADMIN
    ) {
      throw new ForbiddenException('Staffs are not allowed to create Admins.');
    }

    // manager creates staff
    if (
      currentUser.role === Role.MANAGER &&
      createUserAccountDto.role === Role.STAFF
    ) {
      return this.createUserWithRole(
        createUserAccountDto,
        currentUser,
        Role.STAFF,
      );
    }

    if (currentUser.role === Role.STAFF) {
      throw new ForbiddenException('Staff cannot create any other users.');
    }

    throw new ForbiddenException(
      'You are not permitted to create this type of user.',
    );
  }
    

  async changeRole(userId  : number , currentUser : UserAccounts){
    const userToUpdate = await this.userAccountsRepository.findOne({
        where: { id: userId },
        relations: ['staff']
    });

    if (!userToUpdate) {
        throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Only admin can promote staff to manager
    if (currentUser.role !== Role.ADMIN) {
        throw new ForbiddenException('Only administrators can promote staff to manager role');
    }

    // Can only promote STAFF to MANAGER
    if (userToUpdate.role !== Role.STAFF) {
        throw new ForbiddenException('Only staff members can be promoted to manager');
    }
    userToUpdate.role = Role.MANAGER;
    userToUpdate.updated_at = new Date();

    const updatedUser = await this.userAccountsRepository.save(userToUpdate);

    return {
        success: true,
        message: `Staff member successfully promoted to manager role`,
        user: {
            id: updatedUser.id,
            email: updatedUser.email,
            role: updatedUser.role,
            staff_id: updatedUser.staff?.staff_id,
            updated_at: updatedUser.updated_at
        }
    };
  } 


  private async createUserWithRole(
    createUserAccountDto: CreateUserAccountDto,
    currentUser: UserAccounts,
    role: Role,
  ) {
    const hashPassword = await this.hashPassword(createUserAccountDto.password);
    const newUser = this.userAccountsRepository.create({
      email: createUserAccountDto.email,
      password: hashPassword,
      role: role,
      staff: {
        staff_id: createUserAccountDto.staff_id,
      },
    });
   

    // Create response object with role-specific message
    const response = {
      success: true,
      message: this.getCreationMessage(role, currentUser.role),
      
    };

    return response;
  }
  private getCreationMessage(createdRole: Role, creatorRole: Role): string {
    switch (createdRole) {
      case Role.MANAGER:
        return `New manager account has been successfully created by admin`;
      case Role.STAFF:
        return `New staff account has been successfully created by ${creatorRole.toLowerCase()}`;
      case Role.ADMIN:
        return `New admin account has been successfully created`;
      default:
        return 'User account has been created successfully';
    }
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
