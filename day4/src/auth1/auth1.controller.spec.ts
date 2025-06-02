import { Test, TestingModule } from '@nestjs/testing';
import { Auth1Controller } from './auth1.controller';

describe('Auth1Controller', () => {
  let controller: Auth1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Auth1Controller],
    }).compile();

    controller = module.get<Auth1Controller>(Auth1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
