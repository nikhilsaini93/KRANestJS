import { GuestMng } from 'src/guest-mng/enitity/guest-mng.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('service_requests')
export class ServiceRequests {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GuestMng)
  @JoinColumn({ name: 'guest_id' })
  guest: GuestMng;

  @Column()
  service_type: string;

  @Column('text')
  description: string;

  @Column()
  status: string;
}
