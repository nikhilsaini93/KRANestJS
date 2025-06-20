import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
// getProducts() {
// //     return this.productService.getProduct({ id: "01" }).toPromise();
// //   }

@Get(":id")
checkProduct(@Param('id') id: string){
  console.log(id);
}





  
}
