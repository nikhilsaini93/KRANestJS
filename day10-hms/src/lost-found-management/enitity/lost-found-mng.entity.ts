import { RoomMng } from 'src/room_mng/enitity/room-mng.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('lost_found_management')
export class LostFoundManagement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoomMng)
  @JoinColumn({ name: 'room_id' })
  room: RoomMng;

  @Column()
  item_description: string;

  @Column()
  date_found: Date;

  @Column()
  status: string;
}
