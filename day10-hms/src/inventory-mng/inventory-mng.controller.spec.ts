import { Test, TestingModule } from '@nestjs/testing';
import { InventoryMngController } from './inventory-mng.controller';

describe('InventoryMngController', () => {
  let controller: InventoryMngController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryMngController],
    }).compile();

    controller = module.get<InventoryMngController>(InventoryMngController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
