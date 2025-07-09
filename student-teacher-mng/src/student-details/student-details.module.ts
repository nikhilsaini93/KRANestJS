import { Module } from '@nestjs/common';
import { StudentDetailsService } from './student-details.service';
import { StudentDetailsController } from './student-details.controller';
import { StudentDetail } from './entities/student-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentDetail, User, Subject])],
  controllers: [StudentDetailsController],
  providers: [StudentDetailsService],
})
export class StudentDetailsModule {}
