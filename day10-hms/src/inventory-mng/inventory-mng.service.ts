import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryMng } from './enitity/inventory.entity';
import { Repository } from 'typeorm';
import { Supplier } from 'src/supplier/enitity/supplier.entity';
import { PurchaseOrderMng } from 'src/purchase-order-mng/enitity/purchase-order.entity';
import { CreateInventoryDto } from './DTO/inventory.dto';
import { CratePurchaseOrderDto } from 'src/purchase-order-mng/DTO/purchase-order.dto';
import { CreateSupplierDto } from 'src/supplier/DTO/supplier.dto';

@Injectable()
export class InventoryMngService {
    constructor(@InjectRepository(InventoryMng) private readonly inventoryMngRepository: Repository<InventoryMng>,
        @InjectRepository(PurchaseOrderMng) private readonly purchaseOrderMngRepository: Repository<PurchaseOrderMng>,
        @InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>) {}


        async findAllInventory(){
            return this.inventoryMngRepository.find({
                relations :{
                    supplier:true,
                    purchaseOrder:true
                }
            })
        }

        async findInventoryById(id : number){
            let res = await this.inventoryMngRepository.findOne({
                where : {
                    inv_id : id
                },
                relations :{
                    supplier:true,
                    purchaseOrder:true
                
            }})
            if(!res) {
                throw new NotFoundException(`Inventory with id ${id} not found`)
            }
            return res 
        }

        async createInventory(createInventory : CreateInventoryDto){
            let newInventory = this.inventoryMngRepository.create({
                inventory_type : createInventory.inventory_type,
                supplier : {
                    sup_id :createInventory.supplier_id},
                stock : createInventory.quantity_in_stock,
                reorder_date : createInventory.reorder_date,
                expiry_inventory : createInventory.expiry_inventory,
                purchaseOrder : {
                    purchase_id : createInventory.purchase_order_id
                }
            })
            return await this.inventoryMngRepository.save(newInventory)

       }


      async findPurchaseOrder(){
        return await this.purchaseOrderMngRepository.find({
            relations :{
                inventoryItems:true
            }
        })
      }

      async findPurchaseOrderById(id : number){
        let res = await this.purchaseOrderMngRepository.findOne({
            where : {
                purchase_id : id
            },
            relations :{
                inventoryItems:true
            }
        })

        if(!res) {
            throw new NotFoundException(`Purchase Order with id ${id} not found`)
        }
        return res;
    
    }

       async createPurchaseOrder(createPurchaseOrder : CratePurchaseOrderDto){
        let newPurchaseOrder = this.purchaseOrderMngRepository.create({
            supplier : {
                sup_id :createPurchaseOrder.supplier_id},
                item_id : createPurchaseOrder.item_id,
                quantity : createPurchaseOrder.quantity,
                order_date : createPurchaseOrder.order_date
            })
            return await this.purchaseOrderMngRepository.save(newPurchaseOrder)

       }
       
       
       async findSupplier(){
        return await this.supplierRepository.find({
            relations :{
                // inventoryItems:true,
                purchaseOrders:true,

            }
        })
      }

      async findSupplierById(id : number){
        let res = await this.supplierRepository.findOne({
            where : {
                sup_id : id
            },
            relations :{
                // inventoryItems:true,
                purchaseOrders:true,

            }
        })

        if(!res) {
            throw new NotFoundException(`Supplier with id ${id} not found`)
        }
        
        return res;
    }

    async createSupplier(createSupplier : CreateSupplierDto){
        let newSupplier = this.supplierRepository.create({
            company_name : createSupplier.company_name,
            city : createSupplier.city,
            phone : createSupplier.phone,
            email : createSupplier.email

        })
        return await this.supplierRepository.save(newSupplier)

    }





            

}
