import { Test, TestingModule } from '@nestjs/testing';
import { StaffMngController } from './staff_mng.controller';

describe('StaffMngController', () => {
  let controller: StaffMngController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffMngController],
    }).compile();

    controller = module.get<StaffMngController>(StaffMngController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
