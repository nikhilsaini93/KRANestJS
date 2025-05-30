import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';



@Injectable()
export class MyService {
  private users= [
    {
      id: 1,
      name: 'Nik',
      age: 23,
    },
    {
      id: 2,
      name: 'Abc',
      age: 25,
    },
  ];


    getALlUser(){
        return this.users;
    }
    getUserbyid(id: number){
        return this.users.find((user) => user.id == id)

    }

    addUser(user: UserDto){
      const id = this.users.length + 1;
      this.users.push({
        id,
        ...user
      });
      return this.getUserbyid(id);


    }
    
}
