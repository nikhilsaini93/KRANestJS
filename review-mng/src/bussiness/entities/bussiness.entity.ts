// business.entity.ts
import { Review } from 'src/reviews/entities/review.entity';
import { Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bussiness_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;


  @Column()
  address: string;


  @OneToMany(() => Review, (review) => review.business)
  reviews: Review[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
