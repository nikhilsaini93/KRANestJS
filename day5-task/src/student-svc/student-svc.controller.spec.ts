import { Test, TestingModule } from '@nestjs/testing';
import { StudentSvcController } from './student-svc.controller';

describe('StudentSvcController', () => {
  let controller: StudentSvcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentSvcController],
    }).compile();

    controller = module.get<StudentSvcController>(StudentSvcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
