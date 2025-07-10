import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SubjectModule } from './subject/subject.module';
import { MarksModule } from './marks/marks.module';
import { StudentDetailsModule } from './student-details/student-details.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Subject } from './subject/entities/subject.entity';
import { Mark } from './marks/entities/mark.entity';
import { StudentDetail } from './student-details/entities/student-detail.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      autoLoadEntities: true,
      entities: [User , Subject , Mark , StudentDetail],
      synchronize: true,
    }), 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',

    }),
    UsersModule, SubjectModule, MarksModule, StudentDetailsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
