import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GuestMngService } from './guest-mng.service';
import { CreateGuestMngDto } from './DTO/guest-mng.dto';
import { CreateServiceDto } from 'src/service-requests/DTO/service.dto';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { Role } from 'src/user-accounts/enitity/user-account.entity';
import { Roles } from 'src/auth/Decorators/roles.decorators';

@Controller('guest-mng')
@UseGuards(jwtAuthGuards, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
export class GuestMngController {
  constructor(private readonly guestMngService: GuestMngService) {}

  @Get()
  async findall() {
    return await this.guestMngService.findall();
  }
  @Get('service')
  async findAllservices() {
    return await this.guestMngService.findAllservice();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.guestMngService.findById(id);
  }

  @Post()
  async createGuest(@Body() createGuestDto: CreateGuestMngDto) {
    return await this.guestMngService.createGuest(createGuestDto);
  }

  @Get('service/:id')
  async findallservicebyid(@Param('id') id: number) {
    return await this.guestMngService.findAllServicebyId(+id);
  }

  @Get('service/guest/:id')
  async findServiceByGuestId(@Param('id') id: number) {
    return await this.guestMngService.findservicebyguestid(+id);
  }

  @Post('service')
  async createservice(@Body() createservice: CreateServiceDto) {
    return await this.guestMngService.createservice(createservice);
  }

  @Patch('service/:id/status/:status')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async updateservice(
    @Param('id') id: number,
    @Param('status') status: string,
  ) {
    return await this.guestMngService.changeServiceStatus(+id, status);
  }
}
