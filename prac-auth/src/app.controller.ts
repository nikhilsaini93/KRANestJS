import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("check") 
  checkencription(@Body() something: any){
    //(something);
   return this.appService.tocheck(something)
  }
}
