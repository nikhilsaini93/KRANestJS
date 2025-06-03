import { Test, TestingModule } from '@nestjs/testing';
import { AuthSvcController } from './auth-svc.controller';

describe('AuthSvcController', () => {
  let controller: AuthSvcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthSvcController],
    }).compile();

    controller = module.get<AuthSvcController>(AuthSvcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
