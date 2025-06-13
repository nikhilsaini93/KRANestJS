import { StaffMng } from 'src/staff_mng/enitity/stff-mng.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';



@Entity('staff_shifts')
export class StaffShifts {
  @PrimaryGeneratedColumn()
  staff_shift_id: number;

  @Column()
  shift_start: string;

  @Column()
  shift_end: string;

  @Column()
  shift_date: Date;

  @ManyToOne(() => StaffMng, staff => staff.shiftRecords)
  @JoinColumn({ name: 'staff_id' })
  staff: StaffMng;
}
