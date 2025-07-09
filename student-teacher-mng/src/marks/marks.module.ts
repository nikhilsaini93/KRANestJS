import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';
import { Mark } from './entities/mark.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentDetail } from 'src/student-details/entities/student-detail.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mark, StudentDetail, Subject])],
  controllers: [MarksController],
  providers: [MarksService],
})
export class MarksModule {}
