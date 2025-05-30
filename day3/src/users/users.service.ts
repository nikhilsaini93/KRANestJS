import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './DTO/users.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class UsersService {
    private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', purchases: [] },
    { id: 2, name: 'Bob', email: 'bob@example.com', purchases: [] },
  ];

  constructor(private readonly productsService: ProductsService) {}

  findAll(){
    return this.users;
  }

  findById(id : number){
    return this.users.find(user => user.id == id)
  }


//   purchaseProduct(userId : number  , productID  : number){
    
//     const user = this.findById(userId)
//      if (!user) throw new NotFoundException('User not found');
     

//      const product = this.productsService.findById(productID);
     
//     if (!product) throw new NotFoundException('Product not found');
//      user.purchases.push(product)
//     return user 
    
//   }

  purchaseProduct(userId: number, productId: number) {
    const user = this.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const product = this.productsService.findmyById(productId);
    if (!product) throw new NotFoundException('Product not found');

    user.purchases.push(product); 
    return user;
  }

}
