import { Test, TestingModule } from '@nestjs/testing';
import { LostFoundManagementService } from './lost-found-management.service';

describe('LostFoundManagementService', () => {
  let service: LostFoundManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LostFoundManagementService],
    }).compile();

    service = module.get<LostFoundManagementService>(LostFoundManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
