import { GuestMng } from 'src/guest-mng/enitity/guest-mng.entity';
import { HousekeepingTask } from 'src/houseKeeping/enitity/houseKeeping.entity';
import { LostFoundManagement } from 'src/lost-found-management/enitity/lost-found-mng.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';


@Entity('room_mng')
export class RoomMng {
  @PrimaryGeneratedColumn()
  room_number: number;

  @Column()
  room_status_cleaning: string;
 @Column({ 
    type: 'integer',  // Change to integer type
    nullable: true 
  })
  housekeeping_task_assign_id: number | null;

  @Column()
  room_inspection: string;

  @Column({ type: 'boolean', default: true })
  is_Occupied: boolean;

  @ManyToOne(() => GuestMng)
  @JoinColumn({ name: 'assigned_guest_id' })
  guest: GuestMng;

  @OneToMany(() => LostFoundManagement, lostFound => lostFound.room)
  lostFoundItems: LostFoundManagement[];

  @OneToMany(() => HousekeepingTask , housekeepingTask => housekeepingTask.room)
  housekeepingTasks: HousekeepingTask[];

  
}
