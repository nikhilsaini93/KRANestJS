import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentSvcModule } from './student-svc/student-svc.module';
import { AuthSvcModule } from './auth-svc/auth-svc.module';
import { UserMngModule } from './user-mng/user-mng.module';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type : "postgres",
      host: "localhost",
      port : 5432,
      username: "postgres",
      password: "admin",
      database: "testdb",
      autoLoadEntities: true,
      synchronize: true,
    }),
    ThrottlerModule.forRoot({
       throttlers: [
        {
          ttl: 60000,
          limit: 5,
        },
      ],
    }),
      StudentSvcModule, AuthSvcModule, UserMngModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
