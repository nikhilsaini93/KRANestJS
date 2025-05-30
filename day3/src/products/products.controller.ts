import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './DTO.product';
import { UsersService } from 'src/users/users.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly produuctsService : ProductsService,
        private readonly userService : UsersService
    ){}
    
    
    @Get()
    getAllProduct(){
        return this.produuctsService.findALl()
    }
    @Get("api:id")
    getProductById(@Param("id" , ParseIntPipe)  id : number){
        return this.produuctsService.findById(id)

    }

    @Get("my")
    getallmyProdducts(){
        return this.produuctsService.findmyAll()
    }

    @Get("my/:id")
    getmyProductById(@Param("id" , ParseIntPipe)  id : number){
        return this.produuctsService.findmyById(id)

    }
    @Delete("my/:id")
    remvepost(@Param("id" , ParseIntPipe) id : number)
{
    return this.produuctsService.delete(id)
}    

@Put("my/:id")
updatePost(@Param("id" , ParseIntPipe) id : number , 
@Body() updateProductDto : UpdateProductDto){
    return this.produuctsService.updateproduct(id , updateProductDto)
}

@Post("my")
createPost(@Body() createProductDto: CreateProductDto){
    return this.produuctsService.createproduct(createProductDto)
}



@Post("buy/:userId/:productId")
buyProduct(
    @Param("userId" , ParseIntPipe) userId : number,
    @Param("productId" , ParseIntPipe) productId : number
){
    const product = this.produuctsService.findById(productId)
    const user = this.userService.findById(userId)

     if (!product) throw new NotFoundException('Product not found');
     if (!user) throw new NotFoundException('User not found');

     return this.userService.purchaseProduct(userId, productId);
 

}

}
