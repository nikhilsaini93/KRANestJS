import { Test, TestingModule } from '@nestjs/testing';
import { UserMngController } from './user-mng.controller';

describe('UserMngController', () => {
  let controller: UserMngController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMngController],
    }).compile();

    controller = module.get<UserMngController>(UserMngController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
