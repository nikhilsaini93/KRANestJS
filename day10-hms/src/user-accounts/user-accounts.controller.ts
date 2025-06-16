import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserAccountsService } from './user-accounts.service';
import { Roles } from 'src/auth/Decorators/roles.decorators';
import { Role, UserAccounts } from './enitity/user-account.entity';
import { CreateUserAccountDto } from './DTO/user-account.dto';
import { currentUser } from 'src/auth/Decorators/currentUser.decorators';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/role.guards';

@Controller('user-accounts')
export class UserAccountsController {
  constructor(private readonly userAccountsService: UserAccountsService) {}

  // @Post("register")
  // @Roles(Role.ADMIN , Role.MANAGER , Role.STAFF)
  // async create(@Body() userDto : CreateUserAccountDto , @currentUser() user){
  //     console.log("Current User" , user)
  //     return await this.userAccountsService.createUser(userDto , user)
  // }

  @Post('register')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async create(
    @Body() userDto: CreateUserAccountDto,
    @currentUser() user: UserAccounts,
  ) {
    return await this.userAccountsService.createUser(userDto, user);
  }

  @Get()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async findAll(@currentUser() user) {
    console.log('current user', user);
    return await this.userAccountsService.findall();
  }

  @Get(':id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async findById(@Param('id') id: number,
     @currentUser() user: UserAccounts) {
    console.log(currentUser, user);
    return await this.userAccountsService.findOne(+id);
  }

  @Patch(':id/promote-to-manager')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN)
  async promoteToManager(
    @Param('id') id: number,
    @currentUser() currentUser: UserAccounts,
  ) {
    return await this.userAccountsService.changeRole(id, currentUser);
  }
}
