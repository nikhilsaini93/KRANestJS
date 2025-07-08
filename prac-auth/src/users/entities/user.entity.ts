import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity("my_users")
export class User{

    @PrimaryGeneratedColumn()
    userId : number;

    @Column()
    email : string;

    @Column()
    password : string;

   
    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role : UserRole;

    @Column()
    secretmsg: string;

}

