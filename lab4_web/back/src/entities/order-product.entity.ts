import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product.entity'
import { Order } from './order.entity'

@Entity('order_products')
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'int' })
  quantity: number

  @ManyToOne(() => Product, { eager: true, onDelete: 'SET NULL' })
  @JoinTable()
  product: Product

  @ManyToOne(() => Order, (order) => order.products)
  order: Order
}
