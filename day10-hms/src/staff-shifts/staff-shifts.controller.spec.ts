import { Test, TestingModule } from '@nestjs/testing';
import { StaffShiftsController } from './staff-shifts.controller';

describe('StaffShiftsController', () => {
  let controller: StaffShiftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffShiftsController],
    }).compile();

    controller = module.get<StaffShiftsController>(StaffShiftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
