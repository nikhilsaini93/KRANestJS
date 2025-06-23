import { CreateProductDto, PRODUCT_SERVICE_NAME, PRODUCTS_PACKAGE_NAME, ProductServiceClient, UpdateProductDto } from '@app/common/types/product';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';


@Injectable()
export class ProductsService implements OnModuleInit {
    private productService : ProductServiceClient
      constructor(@Inject('PRODUCTS_SERVICE') private  productClient: ClientGrpc){ }
      onModuleInit() {

        this.productService = this.productClient.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME)
      }

  create(createProductDto: CreateProductDto) {
  return this.productService.createProduct(createProductDto);
}

findAll() {
  return this.productService.getAllProducts({});
}

findOne(id: number) {
  return this.productService.findProductById({ id });
}

update(updateProductDto: UpdateProductDto) {
  return this.productService.updateProduct(updateProductDto);
}

remove(id: number) {
  return this.productService.deleteProduct({ id });
}
}
