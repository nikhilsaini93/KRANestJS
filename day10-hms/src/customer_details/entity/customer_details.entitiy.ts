import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Booking} from "../../bookings/entity/booking.entity"
import {ChannelManagement} from "../../channel-management/entity/channel-management.entity"





@Entity('customer_details')
export class Customer{
   @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  phone: string;

  @Column({ type: 'date', nullable: true })
  dob: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string;

  @Column({ type: 'numeric', precision: 6, scale: 0, nullable: true })
  pincode: number;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  customer_status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  id_type: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  id_number: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  updated_at: string;

  @OneToMany(() => Booking, booking => booking.customer)
  bookings: Booking[];

  @OneToMany(() => ChannelManagement , channelmng => channelmng.channel_mng_id)
  channelManagement :  ChannelManagement[]

}