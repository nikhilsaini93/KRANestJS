import { Test, TestingModule } from '@nestjs/testing';
import { TaskMngController } from './task-mng.controller';

describe('TaskMngController', () => {
  let controller: TaskMngController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskMngController],
    }).compile();

    controller = module.get<TaskMngController>(TaskMngController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
