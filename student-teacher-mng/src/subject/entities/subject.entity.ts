import { Mark } from "src/marks/entities/mark.entity";
import { StudentDetail } from "src/student-details/entities/student-detail.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // The teacher who teaches this subject
  @ManyToOne(() => User, user => user.subjectsTaught)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  // Students assigned to this subject
  @ManyToMany(() => StudentDetail, student => student.subjects)
  students: StudentDetail[];

  @OneToMany(() => Mark, mark => mark.subject)
  marks: Mark[];
}
