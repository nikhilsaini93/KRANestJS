import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyController } from './my/my.controller';
import { MyModule } from './my/my.module';
import { MyService } from './my/my.service';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [MyModule, HelloModule],
  controllers: [AppController, MyController],
  providers: [AppService , MyService],
})
export class AppModule {}
