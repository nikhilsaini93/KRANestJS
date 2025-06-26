import { Test, TestingModule } from '@nestjs/testing';
import { NotificationSvcController } from './notification-svc.controller';
import { NotificationSvcService } from './notification-svc.service';

describe('NotificationSvcController', () => {
  let notificationSvcController: NotificationSvcController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationSvcController],
      providers: [NotificationSvcService],
    }).compile();

    notificationSvcController = app.get<NotificationSvcController>(NotificationSvcController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notificationSvcController.getHello()).toBe('Hello World!');
    });
  });
});
