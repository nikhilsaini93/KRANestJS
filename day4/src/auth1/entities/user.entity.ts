import { Post } from "src/posts/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity("rollbased_auth_user")

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole
    
    @OneToMany(() => Post, (post) => post.author)
    posts: User[];
    // @OneToMany(() => User, (post) => post.email)
    // posts: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}