import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChannelManagement } from '../../channel-management/entity/channel-management.entity';
import { BookingDetails } from 'src/bookingdetails/enitity/bookingdetails.entity';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  payment_type: string;

  @Column({ type: 'varchar', length: 20 })
  full_or_partial: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  advance_payment: number;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  refund: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  payment_date: string;

  @OneToMany(() => ChannelManagement, channelManagement => channelManagement.payment)
  channel_managements: ChannelManagement[];

  @OneToMany(() => BookingDetails, booking => booking.payment)
  BookingDetails: BookingDetails[];
}
