import { Module } from '@nestjs/common';
import { PurchaseOrderMngController } from './purchase-order-mng.controller';
import { PurchaseOrderMngService } from './purchase-order-mng.service';

@Module({
  controllers: [PurchaseOrderMngController],
  providers: [PurchaseOrderMngService]
})
export class PurchaseOrderMngModule {}
