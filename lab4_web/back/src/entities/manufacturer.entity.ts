import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('manufacturers')
export class Manufacturer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', length: 100 })
  country: string

  @Column({ name: 'foundation_date', type: 'date' })
  foundationDate: Date
}
