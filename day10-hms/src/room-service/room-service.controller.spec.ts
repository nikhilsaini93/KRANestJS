import { Test, TestingModule } from '@nestjs/testing';
import { RoomServiceController } from './room-service.controller';

describe('RoomServiceController', () => {
  let controller: RoomServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomServiceController],
    }).compile();

    controller = module.get<RoomServiceController>(RoomServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
