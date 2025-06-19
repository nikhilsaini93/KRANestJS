import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InventoryMngService } from './inventory-mng.service';
import { CreateInventoryDto } from './DTO/inventory.dto';
import { CratePurchaseOrderDto } from 'src/purchase-order-mng/DTO/purchase-order.dto';
import { CreateSupplierDto } from 'src/supplier/DTO/supplier.dto';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { Role } from 'src/user-accounts/enitity/user-account.entity';
import { Roles } from 'src/auth/Decorators/roles.decorators';

@Controller('inventory-mng')
export class InventoryMngController {
  constructor(private readonly inventoryMngService: InventoryMngService) {}

  @Get()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async findinventory() {
    return await this.inventoryMngService.findAllInventory();
  }

  @Get('purchase-order')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async findPurchaseOrder() {
    return await this.inventoryMngService.findPurchaseOrder();
  }

  @Get('purchase-order/:id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async findPurchaseOrderByID(@Param('id') id: number) {
    return await this.inventoryMngService.findPurchaseOrderById(+id);
  }

  @Get('supplier')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async findSupplier() {
    return await this.inventoryMngService.findSupplier();
  }

  @Get('supplier/:id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async findSupplierByID(@Param('id') id: number) {
    return await this.inventoryMngService.findSupplierById(+id);
  }
  @Get(':id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async findInventoryById(@Param('id') id: number) {
    return await this.inventoryMngService.findInventoryById(+id);
  }

  @Post()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async createInventory(@Body() createInventory: CreateInventoryDto) {
    return await this.inventoryMngService.createInventory(createInventory);
  }

  @Post('purchase-order')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async createPurchaseOrder(
    @Body() createPurchaseOrder: CratePurchaseOrderDto,
  ) {
    return await this.inventoryMngService.createPurchaseOrder(
      createPurchaseOrder,
    );
  }

  @Post('supplier')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async createSupplier(@Body() createSupplier: CreateSupplierDto) {
    return await this.inventoryMngService.createSupplier(createSupplier);
  }
}
