import { Test, TestingModule } from '@nestjs/testing';
import { StaffMngService } from './staff_mng.service';

describe('StaffMngService', () => {
  let service: StaffMngService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffMngService],
    }).compile();

    service = module.get<StaffMngService>(StaffMngService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
