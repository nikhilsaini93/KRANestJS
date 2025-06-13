// task-mng.entity.ts
import { StaffMng } from 'src/staff_mng/enitity/stff-mng.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToMany } from 'typeorm';


@Entity('task_mng')
export class TaskMng {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  task_type: string ;

  @Column({ type: 'text', nullable: true })
  description: string ;

  @Column({ type: 'varchar' , default : 'pending'})
  status : string

  @ManyToMany(() => StaffMng, staff => staff.tasks)
  staffMembers: StaffMng[];
}

