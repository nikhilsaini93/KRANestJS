import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderMngController } from './purchase-order-mng.controller';

describe('PurchaseOrderMngController', () => {
  let controller: PurchaseOrderMngController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderMngController],
    }).compile();

    controller = module.get<PurchaseOrderMngController>(PurchaseOrderMngController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
