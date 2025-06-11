import { Test, TestingModule } from '@nestjs/testing';
import { KotGenerationService } from './kot-generation.service';

describe('KotGenerationService', () => {
  let service: KotGenerationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KotGenerationService],
    }).compile();

    service = module.get<KotGenerationService>(KotGenerationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
