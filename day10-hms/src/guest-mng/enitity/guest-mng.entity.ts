import { Feedback } from "src/feedback/enitity/feedback.entity";
import { RoomReservation } from "src/room-reservation/enitity/room-reservation";
import { RoomService } from "src/room-service/enitity/room-service.entity";
import { ServiceRequests } from "src/service-requests/enitity/service-req.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('guest_mng')
export class GuestMng {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  room_reservation_id: number | null;

  @Column({ type: 'text', nullable: true })
  special_req_preference: string | null;

  @Column({ type: 'boolean', default: false })
  vip_access: boolean;

  @Column({ type: 'int', nullable: true })
  feedback_id: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  room_updated: string | null;

  @OneToOne(() => RoomReservation)
  @JoinColumn({ name: 'room_reservation_id', referencedColumnName: 'res_id' })
  roomReservation: RoomReservation;

  @OneToOne(() => Feedback)
  @JoinColumn({ name: 'feedback_id', referencedColumnName: 'feedback_id' })
  feedback: Feedback;

//   @OneToMany(() => Invoice, invoice => invoice.guest)
//   invoices: Invoice[];

  @OneToMany(() => RoomService, roomService => roomService.guest)
  roomServices: RoomService[];

  @OneToMany(() => ServiceRequests, serviceRequest => serviceRequest.guest)
  serviceRequests: ServiceRequests[];


}

