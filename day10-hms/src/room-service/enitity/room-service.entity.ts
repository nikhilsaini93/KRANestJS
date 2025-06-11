import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { GuestMng } from 'src/guest-mng/enitity/guest-mng.entity';
import { KotGeneration } from 'src/kot-generation/enitity/kot-gen.entity';
import { Menu } from 'src/menu/enitity/menu.entity';
import { StaffMng } from 'src/staff_mng/enitity/stff-mng.entity';

@Entity('room_service')
export class RoomService {
  @PrimaryGeneratedColumn()
  room_service_id: number;

  @ManyToOne(() => GuestMng)
  @JoinColumn({ name: 'guest_id' })
  guest: GuestMng;

  @ManyToMany(() => StaffMng)
  @JoinTable({ name: 'room_service_staff' }) 
  staff: StaffMng[];

  @Column()
  table_id: number;

 
  @OneToMany(() => KotGeneration, (kot) => kot.roomService)
  ticketOrdersid: KotGeneration[];


  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @Column('numeric')
  total_bill: number;
}
