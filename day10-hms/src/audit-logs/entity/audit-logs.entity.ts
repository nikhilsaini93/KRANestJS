import { UserAccounts } from 'src/user-accounts/enitity/user-account.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('audit_logs')
export class AuditLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserAccounts)
  @JoinColumn({ name: 'user_id' })
  user: UserAccounts;

  @Column()
  log_time: Date;
}
