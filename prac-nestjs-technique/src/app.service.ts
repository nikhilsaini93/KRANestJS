import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
   private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }
  // @Cron('*/5 * * * * *')
  //   handleCron() {
  //   this.logger.debug('Called when the current second is ', new Date().getSeconds());
  // }
  // @Cron('*/5 * * * * *')
  //   handleCron() {
  //   console.log('Called when the current second is ', new Date().getSeconds());
  // }

}
