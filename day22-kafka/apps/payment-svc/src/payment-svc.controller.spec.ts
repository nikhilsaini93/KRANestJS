import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSvcController } from './payment-svc.controller';
import { PaymentSvcService } from './payment-svc.service';

describe('PaymentSvcController', () => {
  let paymentSvcController: PaymentSvcController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentSvcController],
      providers: [PaymentSvcService],
    }).compile();

    paymentSvcController = app.get<PaymentSvcController>(PaymentSvcController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(paymentSvcController.getHello()).toBe('Hello World!');
    });
  });
});
