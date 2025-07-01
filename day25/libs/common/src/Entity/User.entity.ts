import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('new_User')
export class Userr {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}