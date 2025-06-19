import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Post{
    
    @PrimaryGeneratedColumn()
    post_id: number;
    
    @Column()
    title: string;

    @Column()    
    content: string;
    
    @Column({ name: 'author_id'  , nullable:  true})
    authorId?: number;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt?: Date;

}