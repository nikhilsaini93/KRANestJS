import { Module } from '@nestjs/common';
import { InventoryMngController } from './inventory-mng.controller';
import { InventoryMngService } from './inventory-mng.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryMng } from './enitity/inventory.entity';
import { PurchaseOrderMng } from 'src/purchase-order-mng/enitity/purchase-order.entity';
import { Supplier } from 'src/supplier/enitity/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryMng , PurchaseOrderMng , Supplier])], 
  controllers: [InventoryMngController],
  providers: [InventoryMngService]
})
export class InventoryMngModule {}
