import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Order } from './order.entity'

enum AuthProvider {
  LOCAL = 'local',
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}
export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string

  @Column({ type: 'varchar', unique: true })
  login: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ name: 'phone_number', type: 'varchar', length: 20, nullable: true })
  phoneNumber: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]
  @Column({ name: 'auth_provider', type: 'enum', enum: AuthProvider, default: AuthProvider.LOCAL })
  authProvider: AuthProvider

  @Column({ name: 'facebook_id', type: 'varchar', length: 255, nullable: true })
  facebookId: string

  @Column({ name: 'google_id', type: 'varchar', length: 255, nullable: true })
  googleId: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
