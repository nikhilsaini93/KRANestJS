// // kot-generation.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { RoomService } from './room-service.entity';

// @Entity('kot_generation')
// export class KotGeneration {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 50, nullable: true })
//   order_type: string | null;

//   @OneToMany(() => RoomService, roomService => roomService.ticketOrder)
//   roomServices: RoomService[];
// }


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { RoomService } from 'src/room-service/enitity/room-service.entity';

@Entity('kot_generation')
export class KotGeneration {
  @PrimaryGeneratedColumn()
  kot_id: number;

  @Column()
  room_number: number;

  @Column()
  order_time: Date;

  @Column()
  quantity: number;
  @ManyToOne(() => RoomService, (roomService) => roomService.ticketOrdersid)
@JoinColumn({ name: 'room_service_id' })
roomService: RoomService;



}
