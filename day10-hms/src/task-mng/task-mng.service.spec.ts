import { Test, TestingModule } from '@nestjs/testing';
import { TaskMngService } from './task-mng.service';

describe('TaskMngService', () => {
  let service: TaskMngService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskMngService],
    }).compile();

    service = module.get<TaskMngService>(TaskMngService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
