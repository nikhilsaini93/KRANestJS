import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



export enum Role {
    ADMIN = 'admin',
    SUPERADMIN = 'superAdmin',
    CONTROLUSER = 'controlUser',
    EndUser = 'EndUser',
    }

    @Entity("user-mngg")
    export class User {
    @PrimaryGeneratedColumn()
    id: number

     @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @Column({ default: true })
  isActive: boolean;

  // @Column()
  // createdById: number;


  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdById: User

  



  @CreateDateColumn()
    createdAt: Date;


 
   


  }
 

    