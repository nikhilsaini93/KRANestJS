import { Test, TestingModule } from '@nestjs/testing';
import { RoomReservationController } from './room-reservation.controller';

describe('RoomReservationController', () => {
  let controller: RoomReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomReservationController],
    }).compile();

    controller = module.get<RoomReservationController>(RoomReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
