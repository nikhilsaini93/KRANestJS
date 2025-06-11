import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn()
  feedback_id: number;

  @Column()
  guest_id: number;

  @Column()
  feedback_type: string;

  @Column('text')
  description: string;

  @Column()
  rating: number;

  @Column('text')
  suggestion: string;
  
}
