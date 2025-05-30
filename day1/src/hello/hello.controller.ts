import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HelloService } from './hello.service';


@Controller('hello')
export class HelloController {

constructor(private readonly helloService: HelloService) {
}
@Get()
getAllUser(){
    return this.helloService.getAllUser();
}

@Get(":id")
getuserbyId(@Param("id" , ParseIntPipe) id:number){
    return this.helloService.getUserbyid(id)

}
@Get("Welcome/:id")
getWelcomeMsg(@Param("id" , ParseIntPipe) id:number){
    return this.helloService.getWelcomeMsg(id)


}}
