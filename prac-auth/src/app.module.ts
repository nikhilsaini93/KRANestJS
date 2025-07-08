import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'admin',
      database: 'mytestdb',
      autoLoadEntities: true,
      entities: [User],
      synchronize: true,
    }),
    AuthModule, UsersModule,
ThrottlerModule.forRoot({
      throttlers: [
        {
         ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
   
  controllers: [AppController],
  providers: [AppService ,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule {}
