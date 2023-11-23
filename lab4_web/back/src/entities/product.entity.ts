import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Category } from './category.entity'
import { Manufacturer } from './manufacturer.entity'

export enum Unit {
  KILOGRAM = 'kilogram',
  LITER = 'liter',
}
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column({ type: 'enum', enum: Unit, default: Unit.KILOGRAM })
  unit: Unit

  @ManyToOne(() => Manufacturer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: Manufacturer

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column({ type: 'int', select: false })
  quantity: number

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
