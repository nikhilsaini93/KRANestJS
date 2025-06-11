// 10. INVENTORY & SUPPLY
// supplier.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PurchaseOrderMng } from '../../purchase-order-mng/enitity/purchase-order.entity';

@Entity('supplier')
export class Supplier {
  @PrimaryGeneratedColumn()
  sup_id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  company_name: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 0, nullable: true })
  phone: number | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string | null;

  @OneToMany(() => PurchaseOrderMng, purchaseOrder => purchaseOrder.supplier)
  purchaseOrders: PurchaseOrderMng[];
}