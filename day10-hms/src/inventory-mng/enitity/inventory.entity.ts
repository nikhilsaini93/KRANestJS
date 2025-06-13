// inventory-mng.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PurchaseOrderMng } from '../../purchase-order-mng/enitity/purchase-order.entity';
import { Supplier } from '../../supplier/enitity/supplier.entity'; 

@Entity('inventory_mng')
export class InventoryMng {
  @PrimaryGeneratedColumn()
  inv_id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  inventory_type: string | null;

  @Column({ type: 'int', nullable: true })
  supplier_id: number | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  stock: number ;

  @Column({ type: 'date', nullable: true })
  reorder_date: Date ;

  @Column({ type: 'date', nullable: true })
  expiry_inventory: Date ;

  @Column({ type: 'int', nullable: true })
  purchase_order_id: number | null;

  @ManyToOne(() => PurchaseOrderMng, purchaseOrder => purchaseOrder.inventoryItems)
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder: PurchaseOrderMng;

  @ManyToOne(() => Supplier) 
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;
}