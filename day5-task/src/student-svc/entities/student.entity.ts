import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

enum TaskStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    }



@Entity()
export class Student {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['pending', 'completed'], default: 'pending' })
  status: TaskStatus;

  @Column({ type: 'timestamp' })
  dueDate: Date;

//   @ManyToOne(() => User, user => user.tasks, { eager: true })
//   assignedTo: User;

//   @ManyToOne(() => User, user => user.assignedTasks, { eager: true })
//   assignedBy: User;

  @CreateDateColumn()
  createdAt: Date;
}