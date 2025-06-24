import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('myusers')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column()
  password: string;

  @Column({ length: 50 })
  role: string;
}