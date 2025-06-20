import { Injectable } from '@nestjs/common';
import { ProductRequest, ProductResponse } from 'product.interface';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


    getProduct(request: ProductRequest): ProductResponse {
    // Static demo response
    return {
      id: request.id,
      name: 'Sample Product',
      description: 'This is a sample product description.',
    };
  }
}   
