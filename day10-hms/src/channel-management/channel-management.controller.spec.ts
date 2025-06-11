import { Test, TestingModule } from '@nestjs/testing';
import { ChannelManagementController } from './channel-management.controller';

describe('ChannelManagementController', () => {
  let controller: ChannelManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelManagementController],
    }).compile();

    controller = module.get<ChannelManagementController>(ChannelManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
