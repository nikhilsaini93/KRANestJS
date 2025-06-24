
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('blog_posts')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column('text')
  content: string;

  @Column()
  authorId: number;

  // Optionally: If you want to fetch author data using foreign key (read-only here, no relation maintained)
  // You could also use @ManyToOne if you're in a joined schema setup.
  // In a strict microservice setup, avoid direct FK constraints and keep authorId as a reference only.

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

