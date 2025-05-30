import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
  imports: [PaymentModule],
})
export class OrdersModule {}
