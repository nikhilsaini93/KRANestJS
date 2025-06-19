import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './DTO/payment.dto';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { Role } from 'src/user-accounts/enitity/user-account.entity';
import { Roles } from 'src/auth/Decorators/roles.decorators';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async findAllPayment() {
    return await this.paymentService.findAllPayment();
  }

  @Get(':id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async findById(@Param('id') id: number) {
    return await this.paymentService.findById(+id);
  }
  @Patch(':id/status')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async checkPaymentStatus(@Param('id') id: number) {
    return await this.paymentService.checkPaymentStatus(+id);
  }

  @Patch(':id/status/:status')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async updatePaymentStatus(
    @Param('id') id: number,
    @Param('status') status: string,
  ) {
    return await this.paymentService.updatePaymentStatus(+id, status);
  } 

  @Post()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  @HttpCode(HttpStatus.CREATED)
  async createpayment(@Body() createPayment: CreatePaymentDto) {
    return await this.paymentService.createPayment(createPayment);
  }
}
