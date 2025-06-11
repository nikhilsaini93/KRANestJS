import { StaffMng } from 'src/staff_mng/enitity/stff-mng.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('staff_attendance')
export class StaffAttendance {
  @PrimaryGeneratedColumn()
  staff_attendance_id: number;

  @Column()
  staff_id: number;

  @Column()
  date: Date;

  @Column()
  check_in: Date;

  @Column()
  check_out: Date;
  
  @OneToMany(() => StaffMng, staff => staff.attendance)
  staffMembers: StaffMng[];
}
