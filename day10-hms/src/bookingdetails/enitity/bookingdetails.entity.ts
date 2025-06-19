import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Booking } from '../../bookings/entity/booking.entity';
import { Payment } from 'src/payment/enitity/payment.entity';
import { Customer } from 'src/customer_details/entity/customer_details.entitiy';

@Entity('booking_details')
export class BookingDetails {
  @PrimaryGeneratedColumn()
  booking_details_id: number;

  @Column({ type: 'date' })
  booking_date: string;

  @Column({ type: 'varchar', length: 50 })
  room_type: string;

  @Column({ type: 'boolean', default: true })
  is_available: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_bill: number;



  @OneToMany(() => Booking, booking => booking.booking_details)
  bookings: Booking[];
 @ManyToOne(() => Payment, payment => payment.BookingDetails)
  @JoinColumn({ name: 'payment_id' }) 
  payment: Payment;

  @OneToOne(() => Customer, customer => customer.bookingDetails)
  @JoinColumn({ name: 'customer_id' }) 
  customer: Customer;

}    





