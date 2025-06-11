import { Test, TestingModule } from '@nestjs/testing';
import { ChannelManagementService } from './channel-management.service';

describe('ChannelManagementService', () => {
  let service: ChannelManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelManagementService],
    }).compile();

    service = module.get<ChannelManagementService>(ChannelManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
