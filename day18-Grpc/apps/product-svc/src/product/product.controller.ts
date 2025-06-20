import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class ProductController {
  @GrpcMethod('ProductService', 'getProduct')
  getProduct(data: { id: string }) {
    return {
      id: data.id,
      name: `Product ${data.id}`,
      description: `This is a dummy product with id ${data.id}`,
     };
  }
}   