// task-mng.entity.ts
import { StaffMng } from 'src/staff_mng/enitity/stff-mng.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';


@Entity('task_mng')
export class TaskMng {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  task_type: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToMany(() => StaffMng, staff => staff.task)
staffMembers: StaffMng[];
}
