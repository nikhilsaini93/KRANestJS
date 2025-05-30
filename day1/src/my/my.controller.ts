import { Body, Controller , Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { MyService } from './my.service';
import { UserDto } from './user.dto';

@Controller('my')
export class MyController {
//dependecy enjection
constructor(public readonly myService: MyService){}

@Get()
    getallUser(){
        return this.myService.getALlUser()
    }

    @Get(":id")
    getuserbyid(@Param("id" , ParseIntPipe) id:number){
        try {
        const res =  this.myService.getUserbyid(id)
        if(!res)  return "no user found"
        return res

            
        } catch (error) {
            return `error in getting by id ${error}`
  
            
        }
    
         
    }


    @Post()
    addUser(@Body(new ValidationPipe()) user: UserDto ){
        return this.myService.addUser(user)
    }




}
 

// import { Controller } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
// import { MyService } from './my.service';
// import { UserDto } from './user.dto';

// @Controller()
// export class MyController {
//   constructor(private readonly myService: MyService) {}

//   @MessagePattern({ cmd: 'get_all_users' })
//   getAllUsers() {
//     return this.myService.getALlUser();
//   }

//   @MessagePattern({ cmd: 'get_user_by_id' })
//   getUserById(@Payload() id: number) {
//     const res = this.myService.getUserbyid(id);
//     return res ?? 'no user found';
//   }

//   @MessagePattern({ cmd: 'add_user' })
//   addUser(@Payload() user: UserDto) {
//     return this.myService.addUser(user);
//   }
// }
