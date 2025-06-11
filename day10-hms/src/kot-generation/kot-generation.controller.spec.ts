import { Test, TestingModule } from '@nestjs/testing';
import { KotGenerationController } from './kot-generation.controller';

describe('KotGenerationController', () => {
  let controller: KotGenerationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KotGenerationController],
    }).compile();

    controller = module.get<KotGenerationController>(KotGenerationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
