import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { jwtAuthGuards } from 'src/auth-svc/guards/authGuards';
import { RolesGuard } from 'src/auth-svc/guards/roles.guards';
import { UserMngService } from './user-mng.service';
import { Role, User } from './enitiies/user.entity';
import { UserDto } from './DTO/user.dto';
import { Roles } from 'src/auth-svc/decorators/roles.decorator';

@Controller('user-mng')
@UseGuards(jwtAuthGuards , RolesGuard)
export class UserMngController {
constructor(private readonly userMngService: UserMngService) {}


@Post('create')
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.CONTROLUSER)
  create(@Body() userDto : UserDto, @Req() req) {
    console.log('Current User:', req);
    return this.userMngService.createUser(userDto, req.user);
  }


  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.CONTROLUSER)
  findAll( @Req() req) {
    console.log('Current User:', req.user);
    return this.userMngService.findAllUsers(req);
  }

  @Patch(':id/deactivate')
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.CONTROLUSER)
  deactivate(@Param('id') id: number, @Req() req) {
  const currentUser: User = req.user;
    return this.userMngService.deactivateUser(id, currentUser);
  }
   
}
