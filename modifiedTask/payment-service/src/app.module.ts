import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayementModule } from './payement/payement.module';

@Module({
  imports: [PayementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
