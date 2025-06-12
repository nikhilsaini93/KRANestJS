import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Customer } from '../../customer_details/entity/customer_details.entitiy';
import { RoomReservation } from '../../room-reservation/enitity/room-reservation';
import {Payment} from "../../payment/enitity/payment.entity"
import { join } from 'path';

@Entity('channel_management')
export class ChannelManagement {
  @PrimaryGeneratedColumn()
  channel_mng_id: number;

  @ManyToOne(() => Customer, customer => customer.channelManagement)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ type: 'varchar', length: 100 })
  ota: string;

  @Column({ type: 'varchar', length: 50 })
  room_type: string;

  @Column({ type: 'boolean', default: true })
  isavailability: boolean;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'text', nullable: true })
  amenities: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_bill: number;

  @ManyToOne(() => Payment, payment => payment.channel_managements)
  @JoinColumn({ name: 'paymentId' })
  payment: Payment;

  @OneToMany(() => RoomReservation, roomReservation => roomReservation.channel_management)
  room_reservations: RoomReservation[];
}
