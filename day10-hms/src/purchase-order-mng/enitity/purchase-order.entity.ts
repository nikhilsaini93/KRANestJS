// purchase-order-mng.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Supplier } from '../../supplier/enitity/supplier.entity';
import { InventoryMng } from '../../inventory-mng/enitity/inventory.entity';

@Entity('purchase_order_mng')
export class PurchaseOrderMng {
  @PrimaryGeneratedColumn()
  purchase_id: number;

  @Column({ type: 'int', nullable: true })
  supplier_id: number | null;

  @Column({ type: 'int', nullable: true })
  item_id: number | null; // This is not a foreign key here

  @Column({ type: 'int', nullable: false }) // CHECK (quantity > 0) - This check is at DB level
  quantity: number;

  @Column({ type: 'date', nullable: true })
  order_date: Date | null;

  @ManyToOne(() => Supplier, supplier => supplier.purchaseOrders)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @OneToMany(() => InventoryMng, inventory => inventory.purchaseOrder)
  inventoryItems: InventoryMng[];
}