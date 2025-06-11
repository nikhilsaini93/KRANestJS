import { Test, TestingModule } from '@nestjs/testing';
import { RoomMngController } from './room_mng.controller';

describe('RoomMngController', () => {
  let controller: RoomMngController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomMngController],
    }).compile();

    controller = module.get<RoomMngController>(RoomMngController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
