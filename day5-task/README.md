Assignment: Role-Based Authentication with Hierarchical User Permissions
 
->Design and implement a role-based authentication system in NestJS with strict hierarchical control, scoped access, and cascading deactivation logic.
There are 4 types of users in this system:
1-Admin
2-SuperAdmin
3-ControlUser
4-EndUser

REquirement actions->
Admin → can create SuperAdmin
SuperAdmin → can create ControlUser
ControlUser → can create EndUser
->Each user only has control over the users they have directly or indirectly created.

For example:
->ControlUser1 cannot view or manage ControlUser2 or their EndUsers.
->Same applies for SuperAdmins and Admins.
Task Requirements
1. Define Roles
Create a Role enum: ADMIN, SUPERADMIN, CONTROL_USER, END_USER.
2. User Entity Design
Include:
role: Enum type
createdBy: Self-referencing relation
isActive: Boolean flag to track active/deactivated status
3. Implement Authentication
->Use Passport and JWT for login and route protection.
->Protect all sensitive routes with JWT guard.
4. Role-Based Authorization
Create:
@Roles() decorator
RolesGuard to restrict access based on roles
 6. Access Rules:
Admin
Can view all SuperAdmins created under them..
SuperAdmin
Can view & manage their own created ControlUsers.
Cannot access or manage other SuperAdmin's ControlUsers.
ControlUser
Can view & manage their own created EndUsers.
Cannot access or manage another ControlUser's EndUsers.
EndUser
Has no access to manage anyone.
❗Important Note:
For example:
ControlUser1 can manage (create, update, deactivate) EndUsers they created.
ControlUser1 cannot view or manage any data related to ControlUser2 or their EndUsers.

7. Cascading Deactivation Logic 
->If a SuperAdmin deactivates a ControlUser, all of that ControlUser’s EndUsers should also be deactivated
->Deactivation is soft: no deletion, just setting isActive = false
->This should be recursive and follow the hierarchy
8. Create Protected API Endpoints
POST /auth/login → User login
POST /users/create → Create user under hierarchy
GET /users → List only scoped users
PATCH /users/:id/deactivate → Deactivate a user and its subtree
 9. Test Cases to Cover
Log in as each role and verify role-based creation
Try accessing users not created by current user (should be denied)
Deactivate a ControlUser → verify all their EndUsers are also deactivated
Deactivate a SuperAdmin → verify all related ControlUsers and EndUsers are deactivated

covered concept->
Authentication
Proper JWT setup and route protection
Role Guard
Effective use of RolesGuard and @Roles()
User Hierarchy
Strict creation limits and scoped visibility
Cascading Deactivation
Logical and consistent implementation
 Clean Code
Well-structured services, controllers, and modules






// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }
}

// src/auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);


// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Role } from '../role.enum';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user;
    return roles.includes(user.role);
  }
}

// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Role } from '../auth/role.enum';

@Injectable()
export class UsersService {
  async createUser(createUserDto: CreateUserDto, currentUser: User): Promise<User> {
    if (currentUser.role === Role.ADMIN && createUserDto.role === Role.SUPERADMIN) {
      return this.createSuperAdmin(createUserDto);
    } else if (currentUser.role === Role.SUPERADMIN && createUserDto.role === Role.CONTROL_USER) {
      return this.createControlUser(createUserDto);
    } else if (currentUser.role === Role.CONTROL_USER && createUserDto.role === Role.END_USER) {
      return this.createEndUser(createUserDto);
    }
    throw new Error('Unauthorized role creation');
  }

  private async createSuperAdmin(createUserDto: CreateUserDto): Promise<User> {
    // Logic to create SuperAdmin
  }

  private async createControlUser(createUserDto: CreateUserDto): Promise<User> {
    // Logic to create ControlUser
  }

  private async createEndUser(createUserDto: CreateUserDto): Promise<User> {
    // Logic to create EndUser
  }
}
// src/users/users.service.ts
async deactivateUser(userId: number, currentUser: User): Promise<void> {
  const user = await User.findOne({ where: { id: userId }, relations: ['createdBy'] });
  if (!user) throw new Error('User not found');

  if (user.createdBy.id !== currentUser.id) {
    throw new Error('Unauthorized to deactivate this user');
  }

  user.isActive = false;
  await user.save();

  if (user.role === Role.CONTROL_USER) {
    const endUsers = await User.find({ where: { createdBy: user } });
    for (const endUser of endUsers) {
      endUser.isActive = false;
      await endUser.save();
    }
  }
}
// src/users/users.controller.ts
import { Controller, Post, Body, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.CONTROL_USER)
  create(@Body() createUserDto: CreateUserDto, @User() currentUser: User) {
    return this.usersService.createUser(createUserDto, currentUser);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.CONTROL_USER)
  findAll(@User() currentUser: User) {
    return this.usersService.findAll(currentUser);
  }

  @Patch(':id/deactivate')
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.CONTROL_USER)
  deactivate(@Param('id') id: number, @User() currentUser: User) {
    return this.usersService.deactivateUser(id, currentUser);
  }
}






// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Role } from '../auth/role.enum';
import { CreateUserDto } from './dto/create-user.dto'; // assuming the CreateUserDto exists
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Injecting the repository to interact with DB
  ) {}


    Create a user based on the current user's role
   */
  async createUser(createUserDto: CreateUserDto, currentUser: User): Promise<User> {
    // Check if the user has permission to create the requested role
    if (currentUser.role === Role.ADMIN && createUserDto.role === Role.SUPERADMIN) {
      return this.createSuperAdmin(createUserDto, currentUser);
    } else if (currentUser.role === Role.SUPERADMIN && createUserDto.role === Role.CONTROL_USER) {
      return this.createControlUser(createUserDto, currentUser);
    } else if (currentUser.role === Role.CONTROL_USER && createUserDto.role === Role.END_USER) {
      return this.createEndUser(createUserDto, currentUser);
    }
    throw new Error('Unauthorized role creation');
  }

  /**
   * Create SuperAdmin under Admin's scope
   */
  private async createSuperAdmin(createUserDto: CreateUserDto, currentUser: User): Promise<User> {
    // Ensure Admin can only create SuperAdmins
    const superAdmin = new User();
    superAdmin.username = createUserDto.username;
    superAdmin.password = createUserDto.password; // ensure you hash the password before saving in production!
    superAdmin.role = Role.SUPERADMIN;
    superAdmin.createdBy = currentUser; // Associate with Admin
    superAdmin.isActive = true; // Default to active

    return await this.userRepository.save(superAdmin);
  }

  /**
   * Create ControlUser under SuperAdmin's scope
   */
  private async createControlUser(createUserDto: CreateUserDto, currentUser: User): Promise<User> {
    // Ensure SuperAdmin can only create ControlUsers
    const controlUser = new User();
    controlUser.username = createUserDto.username;
    controlUser.password = createUserDto.password; // hash in real production code
    controlUser.role = Role.CONTROL_USER;
    controlUser.createdBy = currentUser; // Associate with SuperAdmin
    controlUser.isActive = true; // Default to active

    return await this.userRepository.save(controlUser);
  }

  /**
   * Create EndUser under ControlUser's scope
   */
  private async createEndUser(createUserDto: CreateUserDto, currentUser: User): Promise<User> {
    // Ensure ControlUser can only create EndUsers
    const endUser = new User();
    endUser.username = createUserDto.username;
    endUser.password = createUserDto.password; // hash in real production code
    endUser.role = Role.END_USER;
    endUser.createdBy = currentUser; // Associate with ControlUser
    endUser.isActive = true; // Default to active

    return await this.userRepository.save(endUser);
  }

  /**
   * Fetch users created by the current user (scoped access)
   */
  async findAll(currentUser: User): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        createdBy: currentUser, // Only return users created by the current user
      },
    });
  }

  /**
   * Deactivate a user and handle cascading deactivation
   */
  async deactivateUser(userId: number, currentUser: User): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['createdBy'] });
    if (!user) throw new Error('User not found');
    
    if (user.createdBy.id !== currentUser.id) {
      throw new Error('Unauthorized to deactivate this user');
    }

    // Soft deactivation
    user.isActive = false;
    await this.userRepository.save(user);

    // Cascading deactivation logic (for ControlUser and their EndUsers)
    if (user.role === Role.CONTROL_USER) {
      const endUsers = await this.userRepository.find({ where: { createdBy: user } });
      for (const endUser of endUsers) {
        endUser.isActive = false;
        await this.userRepository.save(endUser);
      }
    }

    // If a SuperAdmin is deactivated, deactivate all ControlUsers and their EndUsers
    if (user.role === Role.SUPERADMIN) {
      const controlUsers = await this.userRepository.find({ where: { createdBy: user } });
      for (const controlUser of controlUsers) {
        controlUser.isActive = false;
        await this.userRepository.save(controlUser);

        const endUsers = await this.userRepository.find({ where: { createdBy: controlUser } });
        for (const endUser of endUsers) {
          endUser.isActive = false;
          await this.userRepository.save(endUser);
        }
      }
    }
  }
}
