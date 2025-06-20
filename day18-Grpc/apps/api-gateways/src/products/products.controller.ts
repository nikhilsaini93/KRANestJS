// import { Controller, Get, Inject, OnModuleInit, Query } from '@nestjs/common';
// import { ClientGrpc } from '@nestjs/microservices';
// import {ProductService} from "../../../product-svc/product.interface"


// @Controller('products')
// export class ProductsController implements OnModuleInit {
//   private productService: ProductService;

//   constructor(
//     @Inject('PRODUCT_PACKAGE') private readonly client: ClientGrpc
//   ) {}

//   onModuleInit() {
//     this.productService = this.client.getService<ProductService>('ProductService');
//   }

//   @Get()
//   async getProduct(@Query('id') id: string) {
//     // Forward the id from the HTTP request to the gRPC service
//     return this.productService.getProduct({ id });
//   }
// }