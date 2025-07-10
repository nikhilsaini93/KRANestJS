// review.entity.ts


import { Business } from 'src/bussiness/entities/bussiness.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column()
  source: string;


  // RELATION TO CUSTOMER
  @ManyToOne(() => Customer, (customer) => customer.reviews,)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  customer_id: number;

  
  @ManyToOne(() => Business, (business) => business.reviews, )
  @JoinColumn({ name: 'business_id' })
  business: Business;

  @Column()
  business_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string;

  
}
