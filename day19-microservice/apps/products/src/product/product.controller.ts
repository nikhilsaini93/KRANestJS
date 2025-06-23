import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from '@app/common/types/product';
import { ProductServiceControllerMethods } from '@app/common/types/product';

@Controller()
@ProductServiceControllerMethods()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  createProduct(createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  getAllProducts() {
    return this.productService.getAllProducts();
  }

  findProductById(id: { id: number }) {
    return this.productService.findProductById(id.id);
  }

  updateProduct(updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(updateProductDto);
  }

  deleteProduct(DeleteId: { id: number }) {
    return this.productService.remove(DeleteId.id);
  }
}