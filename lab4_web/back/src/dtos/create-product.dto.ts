import { IsNotEmpty, IsNumber, IsEnum, IsString, IsUUID, Min } from 'class-validator'

enum Unit {
  KILOGRAM = 'kilogram',
  LITER = 'liter',
}

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be non-negative' })
  price: number

  @IsNotEmpty({ message: 'Unit is required' })
  @IsEnum(Unit)
  unit: Unit

  @IsNotEmpty({ message: 'Manufacturer ID is required' })
  @IsUUID()
  manufacturerId: string

  @IsNotEmpty({ message: 'Category ID is required' })
  @IsUUID()
  categoryId: string

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0, { message: 'Quantity must be non-negative' })
  quantity: number
}
