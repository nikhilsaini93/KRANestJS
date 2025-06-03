import { Test, TestingModule } from '@nestjs/testing';
import { UserMngService } from './user-mng.service';

describe('UserMngService', () => {
  let service: UserMngService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMngService],
    }).compile();

    service = module.get<UserMngService>(UserMngService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
