import { Test, TestingModule } from '@nestjs/testing';
import { StaffShiftsService } from './staff-shifts.service';

describe('StaffShiftsService', () => {
  let service: StaffShiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffShiftsService],
    }).compile();

    service = module.get<StaffShiftsService>(StaffShiftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
