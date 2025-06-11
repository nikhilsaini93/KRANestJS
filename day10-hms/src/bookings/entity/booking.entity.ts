import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Customer } from '../../customer_details/entity/customer_details.entitiy';
import { BookingDetails } from '../../bookingdetails/enitity/bookingdetails.entity';
import { RoomReservation } from '../../room-reservation/enitity/room-reservation';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @Column({ type: 'varchar', length: 100 })
  hotel_name: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  booking_status: string;

  @Column({ type: 'text' })
  amenities: string;

@ManyToOne(() => Customer, customer => customer.bookings)
@JoinColumn({ name: 'customer_id' })  // Custom column name
customer: Customer;

@ManyToOne(() => BookingDetails, bookingDetails => bookingDetails.bookings)
@JoinColumn({ name: 'booking_details_id' })  // Custom column name
booking_details: BookingDetails;


  @OneToMany(() => RoomReservation, roomReservation => roomReservation.booking)
  room_reservations: RoomReservation[];
}