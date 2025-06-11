import { Test, TestingModule } from '@nestjs/testing';
import { LostFoundManagementController } from './lost-found-management.controller';

describe('LostFoundManagementController', () => {
  let controller: LostFoundManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LostFoundManagementController],
    }).compile();

    controller = module.get<LostFoundManagementController>(LostFoundManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
