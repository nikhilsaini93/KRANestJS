import { Test, TestingModule } from '@nestjs/testing';
import { GuestMngController } from './guest-mng.controller';

describe('GuestMngController', () => {
  let controller: GuestMngController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestMngController],
    }).compile();

    controller = module.get<GuestMngController>(GuestMngController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
