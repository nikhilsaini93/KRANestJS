import { forwardRef, Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [forwardRef(() => OrdersModule)],
  exports: [PaymentService] // Exporting PaymentService to be used in other modules
})
export class PaymentModule {}

