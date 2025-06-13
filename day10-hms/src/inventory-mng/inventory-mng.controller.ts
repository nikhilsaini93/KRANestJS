import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InventoryMngService } from './inventory-mng.service';
import { CreateInventoryDto } from './DTO/inventory.dto';
import { CratePurchaseOrderDto } from 'src/purchase-order-mng/DTO/purchase-order.dto';
import { CreateSupplierDto } from 'src/supplier/DTO/supplier.dto';

@Controller('inventory-mng')
export class InventoryMngController {
    constructor(private readonly inventoryMngService : InventoryMngService
    ){}
    
    @Get()
    async findinventory(){
        return await this.inventoryMngService.findAllInventory();
    }


 

    @Get('purchase-order')
    async findPurchaseOrder(){
        return await this.inventoryMngService.findPurchaseOrder();
    }

    @Get('purchase-order/:id')
        async findPurchaseOrderByID(@Param("id") id : number){
            return await this.inventoryMngService.findPurchaseOrderById(+id);
        }

        @Get('supplier')
        async findSupplier(){
            return await this.inventoryMngService.findSupplier();
        }

        @Get('supplier/:id')
        async findSupplierByID(@Param("id") id  : number){
            return await this.inventoryMngService.findSupplierById(+id);
        }
   @Get(':id')
    async findInventoryById(@Param('id')id : number){
        return await this.inventoryMngService.findInventoryById(+id);
    }

    @Post()
    async createInventory(@Body() createInventory : CreateInventoryDto){
        return await this.inventoryMngService.createInventory(createInventory)
    }

    @Post("purchase-order")
    async createPurchaseOrder(@Body() createPurchaseOrder : CratePurchaseOrderDto){
        return await this.inventoryMngService.createPurchaseOrder(createPurchaseOrder)
    }

    @Post("supplier")
    async createSupplier(@Body() createSupplier : CreateSupplierDto){
        return await this.inventoryMngService.createSupplier(createSupplier)
    }








}
