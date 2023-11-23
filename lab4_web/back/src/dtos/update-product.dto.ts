import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator'
import { Unit } from '../entities/product.entity'

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string

  @IsOptional()
  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be non-negative' })
  price: number

  @IsOptional()
  @IsNotEmpty({ message: 'Unit is required' })
  @IsEnum(Unit)
  unit: Unit

  @IsOptional()
  @IsNotEmpty({ message: 'Manufacturer ID is required' })
  @IsUUID()
  manufacturerId: string

  @IsOptional()
  @IsNotEmpty({ message: 'Category ID is required' })
  @IsUUID()
  categoryId: string

  @IsOptional()
  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0, { message: 'Quantity must be non-negative' })
  quantity: number
}
