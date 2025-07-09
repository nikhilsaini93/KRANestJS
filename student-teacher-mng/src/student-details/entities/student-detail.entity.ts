
import { Mark } from "src/marks/entities/mark.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('student_details')
export class StudentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.studentDetail)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, user => user.assignedStudents)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  // Subjects the student is enrolled in
  @ManyToMany(() => Subject, subject => subject.students)
  @JoinTable({
    name: 'student_subjects',
    joinColumn: { name: 'student_detail_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'subject_id', referencedColumnName: 'id' },
  })
  subjects: Subject[];

  // Marks for each subject per semester
  @OneToMany(() => Mark, mark => mark.studentDetail, { cascade: true })
  marks: Mark[];
}
