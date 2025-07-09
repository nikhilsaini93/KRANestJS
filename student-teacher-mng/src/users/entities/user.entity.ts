import { StudentDetail } from "src/student-details/entities/student-detail.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: true })
  profileImageUrl: string;

  // Students assigned to teacher (if this user is a teacher)
  @OneToMany(() => StudentDetail, sd => sd.teacher)
  assignedStudents: StudentDetail[];

  // Student's extra info (if this user is a student)
  @OneToOne(() => StudentDetail, sd => sd.user)
  studentDetail: StudentDetail;

  // Subjects taught by teacher
  @OneToMany(() => Subject, subject => subject.teacher)
  subjectsTaught: Subject[];
}
