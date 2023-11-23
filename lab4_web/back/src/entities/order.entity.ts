import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { User } from './user.entity'
import { OrderProduct } from './order-product.entity'
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'SET NULL' })
  user: User

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, { cascade: true })
  products: OrderProduct[]
}
