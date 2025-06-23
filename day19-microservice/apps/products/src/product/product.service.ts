import { CreateProductDto ,ProductServiceControllerMethods,UpdateProductDto} from '@app/common/types/product';
import { Injectable, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';


@Injectable()

export class ProductService implements OnModuleInit {

  onModuleInit() {
    console.log('ProductService initialized');
  }
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>){}


  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async getAllProducts(): Promise<{ products: Product[] }> {
  const products = await this.productRepository.find();
  return { products }; 
}

  async findProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

 async updateProduct(updateProductDto: UpdateProductDto): Promise<Product> {
  const product = await this.productRepository.preload(updateProductDto);
  if (!product) {
    throw new NotFoundException(`Product with ID ${updateProductDto.id} not found`);
  }
  return this.productRepository.save(product);
}



  async remove(id: number): Promise<Product> {
    const product = await this.findProductById(id);
    await this.productRepository.remove(product);
    return product;
  }
}
