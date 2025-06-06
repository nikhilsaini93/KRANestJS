import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class Todo{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column()
    description : string;

    @Column()
    priority : string;


    @Column()
    isCompleted : boolean;

     @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}