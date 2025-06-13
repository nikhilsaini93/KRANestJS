import { StaffMng } from 'src/staff_mng/enitity/stff-mng.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('staff_attendance')

export class StaffAttendance {
  @PrimaryGeneratedColumn()
  staff_attendance_id: number;

  @Column()
  date: Date;

  @Column()
  check_in: Date;

  @Column({ type: 'timestamp', nullable: true })
  check_out: Date | null;


  @ManyToOne(() => StaffMng, staff => staff.attendanceRecords)
  @JoinColumn({ name: 'staff_id' })
  staff: StaffMng;
}
