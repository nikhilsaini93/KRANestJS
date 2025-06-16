import { StaffMng } from 'src/staff_mng/enitity/stff-mng.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';

export enum Role {
    ADMIN = 'admin',
    STAFF = 'staff',
    MANAGER = 'manager'
  
    }


@Entity('user_accounts')
export class UserAccounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @OneToOne(() => StaffMng, staff => staff.users)
  @JoinColumn({ name: 'staff_id' })
  staff: StaffMng;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

