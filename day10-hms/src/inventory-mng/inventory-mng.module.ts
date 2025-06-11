import { Module } from '@nestjs/common';
import { InventoryMngController } from './inventory-mng.controller';
import { InventoryMngService } from './inventory-mng.service';

@Module({
  controllers: [InventoryMngController],
  providers: [InventoryMngService]
})
export class InventoryMngModule {}
