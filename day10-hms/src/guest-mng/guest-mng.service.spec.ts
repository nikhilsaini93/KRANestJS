import { Test, TestingModule } from '@nestjs/testing';
import { GuestMngService } from './guest-mng.service';

describe('GuestMngService', () => {
  let service: GuestMngService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuestMngService],
    }).compile();

    service = module.get<GuestMngService>(GuestMngService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
