import { StaffMng } from 'src/staff_mng/enitity/stff-mng.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity('staff_shifts')
export class StaffShifts {
  @PrimaryGeneratedColumn()
  staff_shift_id: number;

  @Column()
  staff_id: number;

  @Column()
  shift_start: string;

  @Column()
  shift_end: string;

  @Column()
  shift_date: Date;

  @OneToMany(() => StaffMng, staff => staff.shift)
  staffMembers: StaffMng[];
}
