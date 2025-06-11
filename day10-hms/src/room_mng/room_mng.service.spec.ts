import { Test, TestingModule } from '@nestjs/testing';
import { RoomMngService } from './room_mng.service';

describe('RoomMngService', () => {
  let service: RoomMngService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomMngService],
    }).compile();

    service = module.get<RoomMngService>(RoomMngService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
