import { RoomService } from 'src/room-service/enitity/room-service.entity';
import { StaffAttendance } from 'src/staff-attendance/enitity/staff-attendence.entity';
import { StaffShifts } from 'src/staff-shifts/enitity/staff-shifts.entity';
import { TaskMng } from 'src/task-mng/enitity/task-mng.entity';
import { UserAccounts } from 'src/user-accounts/enitity/user-account.entity';

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne, ManyToMany } from 'typeorm';

@Entity('staff_mng')
export class StaffMng {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  staff_type: number;

  @Column()
  role: string;

  @Column()
  salary: number;

  @Column()
  dept: string;

  @ManyToOne(() => StaffAttendance, attendance => attendance.staffMembers)
  @JoinColumn({ name: 'attendance_id' })
  attendance: StaffAttendance;

  @ManyToOne(() => StaffShifts, shift => shift.staffMembers)
  @JoinColumn({ name: 'staff_shift_id' })
  shift: StaffShifts;

  @OneToMany(() => TaskMng, task => task.staffMembers)
  @JoinColumn({ name: 'task_assign_id' })
  task: TaskMng;

  
  @OneToMany(() => UserAccounts, user => user.staff)
  users: UserAccounts[];

  @ManyToMany(() => RoomService, roomService => roomService.staff)
  roomServices: RoomService[];

}
