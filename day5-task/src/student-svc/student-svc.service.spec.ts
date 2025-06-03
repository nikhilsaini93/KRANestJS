import { Test, TestingModule } from '@nestjs/testing';
import { StudentSvcService } from './student-svc.service';

describe('StudentSvcService', () => {
  let service: StudentSvcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentSvcService],
    }).compile();

    service = module.get<StudentSvcService>(StudentSvcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
