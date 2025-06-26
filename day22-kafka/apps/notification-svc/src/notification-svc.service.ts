import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationSvcService {
  getHello(): string {
    return 'Hello World!';
  }
}
