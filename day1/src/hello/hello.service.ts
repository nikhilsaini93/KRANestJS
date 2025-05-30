// import { Injectable } from '@nestjs/common';
// import { MyService } from 'src/my/my.service';


// @Injectable()
// export class HelloService {
//     constructor (private readonly myService : MyService){}


//     getAllUser(){
//         return[{
//       id: 5,
//       name: 'Nik',
//       age: 23,
//     },
//     {
//       id: 6,
//       name: 'Abc',
//       age: 25,
//     },]
//     }

//        getUserbyid(id: number){
//         const USer = this.getAllUser().find((user) => user.id == id)
//          if(!USer) return "no user found"  
//          return USer

//     }

//     getWelcomeMsg(UserID : number){
//         const user = this.getUserbyid(UserID)
//         if(!user) return "no user found"  
        
//         return `hi ${user} , ${UserID} ${this.myService.getUserbyid(UserID)}`


    
// }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { MyService } from 'src/my/my.service';

@Injectable()
export class HelloService {
  constructor(private readonly myService: MyService) {}

  getAllUser() {
    return [
      {
        id: 5,
        name: 'Nik',
        age: 23,
      },
      {
        id: 6,
        name: 'Abc',
        age: 25,
      },
    ];
  }

  getUserbyid(id: number) {
    const user = this.getAllUser().find((user) => user.id === id);
    return user || null; // return null instead of a string
  }

  getWelcomeMsg(UserID: number) {
    const user = this.getUserbyid(UserID);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return `Hi ${user.name}, your ID is ${user.id} and your age is ${user.age}.`;
  }
}
