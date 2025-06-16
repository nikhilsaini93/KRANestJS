import { HousekeepingTask } from 'src/houseKeeping/enitity/houseKeeping.entity';
import { RoomService } from 'src/room-service/enitity/room-service.entity';
import { StaffAttendance } from 'src/staff-attendance/enitity/staff-attendence.entity';
import { StaffShifts } from 'src/staff-shifts/enitity/staff-shifts.entity';
import { TaskMng } from 'src/task-mng/enitity/task-mng.entity';
import { UserAccounts } from 'src/user-accounts/enitity/user-account.entity';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm';

@Entity('staff_mng')
export class StaffMng {
  @PrimaryGeneratedColumn()
  staff_id: number;

  @Column()
  staff_type: number;

  @Column()
  role: string;

  @Column()
  salary: number;

  @Column()
  dept: string;


  @OneToMany(() => StaffAttendance, attendance => attendance.staff)
  
  attendanceRecords: StaffAttendance[];


  @OneToMany(() => StaffShifts, shift => shift.staff)
  shiftRecords: StaffShifts[];

  // Many-to-many: Staff <--> Tasks
  @ManyToMany(() => TaskMng, task => task.staffMembers)
  @JoinTable({
    name: 'staff_task_assignments',
    joinColumn: { name: 'staff_id', referencedColumnName: 'staff_id' },
    inverseJoinColumn: { name: 'task_id', referencedColumnName: 'task_id' },
  })
  tasks: TaskMng[];


  @OneToOne(() => UserAccounts, user => user.staff)
  users: UserAccounts[];

  @OneToMany(() => HousekeepingTask , housekeeping => housekeeping.staff )
  housekeepingTasks: HousekeepingTask[];



  @ManyToMany(() => RoomService, roomService => roomService.staff)
  roomServices: RoomService[];
}

