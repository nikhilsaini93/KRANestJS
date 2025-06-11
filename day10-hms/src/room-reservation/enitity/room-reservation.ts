import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Booking } from '../../bookings/entity/booking.entity';
import { ChannelManagement } from '../../channel-management/entity/channel-management.entity'
import { GuestMng } from 'src/guest-mng/enitity/guest-mng.entity';

@Entity('room_reservation')
export class RoomReservation {
  @PrimaryGeneratedColumn()
  res_id: number;

  @ManyToOne(() => Booking, booking => booking.room_reservations)
  booking: Booking;

  @Column({ type: 'varchar', length: 30 })
  booking_type: string;

  @Column({ type: 'varchar', length: 30, default: 'pending' })
  room_reservation_status: string;

  @Column({ type: 'boolean', default: true })
  is_room_available: boolean;

  @Column({ type: 'timestamp', nullable: true })
  check_in: string;

  @Column({ type: 'timestamp', nullable: true })
  check_out_time: string;

  @ManyToOne(() => ChannelManagement, channelManagement => channelManagement.room_reservations)
  channel_management: ChannelManagement;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  extra_fees: number;
  
   @OneToOne(() => GuestMng, guest => guest.roomReservation)
  guest: GuestMng;
}



// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity('room_reservation')
// export class RoomReservation {
//   @PrimaryGeneratedColumn()
//   reservation_id: number;

//   @Column()
//   room_number: number;

//   @Column()
//   customer_id: number;

//   @Column()
//   check_in: Date;

//   @Column()
//   check_out: Date;

//   @Column()
//   reservation_status: string;
// }
