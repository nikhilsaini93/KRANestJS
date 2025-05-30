import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

import { MyModule } from 'src/my/my.module';

@Module({
 imports : [MyModule],
  controllers: [HelloController],
  providers: [HelloService],
 
})
export class HelloModule {}
