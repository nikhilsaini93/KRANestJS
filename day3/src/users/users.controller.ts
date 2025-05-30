import { Controller, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

import { ProductsService } from 'src/products/products.service';

@Controller('users')
export class UsersController {


    constructor( private readonly userService: UsersService, private readonly productService : ProductsService){}

    @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  // GET /users/:id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  @Get(':id/purchases')
  getUserPurchases(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findById(id);
      if (!user) throw new NotFoundException('User not found');
    //     const allProducts = this.productService.findmyAll();
    // const purchasedProducts = allProducts.filter(product =>
    //   user.purchases.includes(product.id)
    // );

    return user.purchases;
  }
  
}
