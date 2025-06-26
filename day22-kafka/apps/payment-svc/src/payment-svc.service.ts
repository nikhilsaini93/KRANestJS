import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentSvcService {
  getHello(): string {
    return 'Hello World!';
  }
}
