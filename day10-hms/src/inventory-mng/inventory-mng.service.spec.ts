import { Test, TestingModule } from '@nestjs/testing';
import { InventoryMngService } from './inventory-mng.service';

describe('InventoryMngService', () => {
  let service: InventoryMngService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryMngService],
    }).compile();

    service = module.get<InventoryMngService>(InventoryMngService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
