import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RoomMng } from 'src/room_mng/enitity/room-mng.entity';
import { StaffMng } from 'src/staff_mng/enitity/stff-mng.entity';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum TaskType {
  CLEANING = 'cleaning',
  MAINTENANCE = 'maintenance',
  LAUNDRY = 'laundry',
  INSPECTION = 'inspection',
  RESTOCKING = 'restocking'
}

@Entity('housekeeping_tasks')
export class HousekeepingTask {
  @PrimaryGeneratedColumn()
  Htask_id: number;

  @Column()
  room_id: number;

  @Column({
    type: 'enum',
    enum: TaskType
  })
  task_type: TaskType;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING
  })
  status: TaskStatus;

  @Column()
  assigned_staff_id: number;

  @Column({ type: 'date' })
  scheduled_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

@ManyToOne(() => RoomMng, room => room.housekeepingTasks)
  @JoinColumn({ name: 'room_id' })
  room: RoomMng;

  @ManyToOne(() => StaffMng)
  @JoinColumn({ name: 'assigned_staff_id' })
  staff: StaffMng;
}