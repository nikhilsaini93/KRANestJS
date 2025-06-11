import { Test, TestingModule } from '@nestjs/testing';
import { RoomServiceService } from './room-service.service';

describe('RoomServiceService', () => {
  let service: RoomServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomServiceService],
    }).compile();

    service = module.get<RoomServiceService>(RoomServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
