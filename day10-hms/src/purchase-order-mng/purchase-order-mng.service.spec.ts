import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderMngService } from './purchase-order-mng.service';

describe('PurchaseOrderMngService', () => {
  let service: PurchaseOrderMngService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseOrderMngService],
    }).compile();

    service = module.get<PurchaseOrderMngService>(PurchaseOrderMngService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
