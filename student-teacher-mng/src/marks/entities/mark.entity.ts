
import { StudentDetail } from "src/student-details/entities/student-detail.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum Semester {
  SEM1 = 1,
  SEM2 = 2,
}

@Entity('marks')
@Unique(['studentDetail', 'subject', 'semester'])
export class Mark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StudentDetail, sd => sd.marks)
  @JoinColumn({ name: 'student_detail_id' })
  studentDetail: StudentDetail;

  @ManyToOne(() => Subject, subject => subject.marks)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ type: 'enum', enum: Semester })
  semester: Semester;

  @Column('int')
  marks: number;
}
