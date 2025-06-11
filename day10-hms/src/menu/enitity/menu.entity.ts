
import { RoomService } from 'src/room-service/enitity/room-service.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  menu_id: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  menu_type: string | null;

  @Column({ type: 'numeric', nullable: true }) // CHECK (price >= 0) - This check is at DB level
  price: number | null;

  @OneToMany(() => RoomService, roomService => roomService.menu)
  roomServices: RoomService[];
}